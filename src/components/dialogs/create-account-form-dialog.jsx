import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { MultiStepForm } from "@/components/forms/create-account-form"

export function AccountCreateDialog({ open, onOpenChange }) {
    const handleFormComplete = () => {
        setTimeout(() => {
            onOpenChange(false);
        }, 2000);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] md:max-w-[800px] lg:max-w-[900px] p-0">
                <div className="px-2 py-2">
                    <MultiStepForm onComplete={handleFormComplete} />
                </div>
            </DialogContent>
        </Dialog>
    );
}
