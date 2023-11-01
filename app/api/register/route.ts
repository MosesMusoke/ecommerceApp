import prisma from '@/app/prismadb'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'


export async function POST (req : Request) {
    const body = await req.json()
    const {name, email, password} = body

    // hashing the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 12)

    try {
        
        const newUser = await prisma.user.create(
            {data: {name, email, password : hashedPassword}}
        )

        return NextResponse.json(newUser)

    } catch (error) {
        console.log(error)
        return NextResponse.error()
    }
}

