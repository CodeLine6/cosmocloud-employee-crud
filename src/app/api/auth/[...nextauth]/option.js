import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

const admin = {
    id: "64c85edfd455b2025dbdf92b",
    username: "cosmocloud_admin",
    email: "john@cosmocloud.com",
    firstName: "John",
    lastName: "Doe",
    contactNumber: "9876543210",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP9_pOtGguTfvWCRBEHYlOueBWgccNMvKN_A&s",
    password:"$2a$10$NDfUB3WmtXdUpj8zWPKhjuTBblTnR.PxN7Km7m3eDcUAvGUZ/IyYC"
}
export const authOptions = {
    providers : [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                identifier : {label: "Username", type: "text"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials) {
                if(!credentials) return null
                try {
                    const user = (admin.username == credentials.identifier || admin.email == credentials.identifier) ? admin : null

                    if(!user) throw new Error("User not found")

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
                    if(!isPasswordCorrect) throw new Error("Incorrect password")
                    return user    
                }
                catch (error) {
                    throw new Error(error)
                }
            }
        })
    ],
    callbacks : {
        async jwt({ token, user,trigger,session }) {
            if(user) {
                token._id  = user.id.toString()
                token.username = user.username
                token.email = user.email
                token.firstName = user.firstName
                token.lastName = user.lastName
                token.image = user.image
                token.contactNumber = user.contactNumber
            }

            return token
          },
        async session({ session, token }) {
            if(token) {
                session.user._id = token._id
                session.user.username = token.username
                session.user.email = token.email
                session.user.firstName = token.firstName
                session.user.lastName = token.lastName
                session.user.image = token.image
                session.user.contactNumber = token.contactNumber
            }
            return session
          },
    },
    pages: {
        signIn: "/sign-in",
        
    },
    session : {
        strategy: "jwt"
    },
    secret : process.env.NEXTAUTH_SECRET,}