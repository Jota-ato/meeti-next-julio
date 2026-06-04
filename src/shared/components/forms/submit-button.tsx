import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

interface Props {
    isSubmitting: boolean
    label: string
    loadingLabel: string
}

export function SubmitButton({ isSubmitting, label, loadingLabel }: Props) {
    return (
        <Button
            disabled={isSubmitting}
            type="submit"
            className="w-full disabled:cursor-not-allowed opacity-90"
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