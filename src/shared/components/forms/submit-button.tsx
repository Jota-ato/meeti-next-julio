import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

interface Props {
    isSubmitting: boolean
    label: string
    loadingLabel: string
    destructive?: boolean
}

export function SubmitButton({ isSubmitting, label, loadingLabel, destructive = false }: Props) {
    return (
        <Button
            variant={destructive ? 'destructive' : 'default'}
            disabled={isSubmitting}
            type="submit"
            className="disabled:cursor-not-allowed opacity-90"
        >
            {isSubmitting ? (
                <p className="flex items-center gap-2">
                    <Spinner />
                    {loadingLabel}
                </p>
            ) : label}
        </Button>
    )
}