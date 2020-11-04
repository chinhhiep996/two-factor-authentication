import qrcode from 'qrcode';
import { authenticator } from 'otplib';

export function generateUniqueSecret(): string {
    return authenticator.generateSecret();
}

export function generateOTPToken(username: string, serviceName: string, secret: string): string {
    return authenticator.keyuri(username, serviceName, secret);
}

export function verifyOTPToken(token: string, secret: string): boolean {
    return authenticator.verify({ token, secret });
}

export async function generateQRCode(otpAuth: string | qrcode.QRCodeSegment[]) {
    try {
        const qrCodeImageUrl = await qrcode.toDataURL(otpAuth);
        return `<img src='${qrCodeImageUrl}' alt='qr-code-img' />`
    } catch (error) {
        console.log('Could not generate QR code', error)
        return;
    }
}
