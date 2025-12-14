import jwt from "jsonwebtoken"

export function getAccessToken(user: any) {

    const tokenData = {
        id: user._id,
        email: user.email,
        role: user.role
    }

    // Access Token: Short life (e.g., 15 minutes) - Used for API calls
    const accessToken = jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "1d" })

    return accessToken
}

export function getRefreshToken(user: any) {

    const tokenData = {
        id: user._id,
        email: user.email,
        role: user.role
    }

    // Refresh Token: Long life (e.g., 7 days) - Used to get new Access Tokens
    const refreshToken = jwt.sign(tokenData, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: "7d" })

    return refreshToken

}