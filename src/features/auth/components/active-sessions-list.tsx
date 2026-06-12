import { Heading } from "@/shared/components/typography/heading";
import { authService } from "../services/auth-service";
import { formatUserAgent } from "@/shared/utils/user-agent";
import { RevokeSessionButton } from "./revoke-session-button";

export async function ActiveSessionsList() {

    const [sessions, currentSession] = await Promise.all([
        authService.getSessions(),
        await authService.getSession()
    ])

    const isCurrentDevice = (currentSessionId: string) => currentSession?.session.id === currentSessionId

    return (
        <>
            <Heading level={2}>Sessiones activas</Heading>

            <div className="mt-10 p-5 border border-muted-foreground">
                {sessions.map(session => (
                    <div key={session.id} className="p-5 bg-card shadow-xs flex items-center">
                        <div className="lg:flex lg:gap-2 lg:items-center flex-1">
                            <p>{formatUserAgent(session.userAgent!)}</p>
                            {isCurrentDevice(session.id) && <p className="text-success-foreground font-bold bg-success px-3 py-1 uppercase text-xs rounded-full">Este dispositivo</p>}
                        </div>
                        <RevokeSessionButton token={session.token} />
                    </div>
                ))}
            </div>
        </>
    )
}