import { Metadata } from 'next'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import ProfileForm from './ProfileForm'

export const metadata: Metadata = {
    title: 'Profile | Criss Cross LTD',
    description: 'Manage your profile settings.',
}

export default function ProfilePage() {
    return (
        <ProtectedRoute>
            <div className="container mx-auto px-4 py-8">
                <ProfileForm />
            </div>
        </ProtectedRoute>
    )
}