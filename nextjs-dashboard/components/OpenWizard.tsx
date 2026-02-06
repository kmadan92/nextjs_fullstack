"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FolderPlus, Image as ImageIcon, Video, ArrowLeft } from "lucide-react"
import { PlusCircleIcon } from '@heroicons/react/24/outline'

// Define the 3 types of actions
type WizardType = "folder" | "images" | "videos" | null

export function OpenWizard() {
    const [open, setOpen] = useState(false)
    const [step, setStep] = useState(1)
    const [selectedType, setSelectedType] = useState<WizardType>(null)

    // Reset state when dialog closes
    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen)
        if (!isOpen) {
            setTimeout(() => {
                setStep(1)
                setSelectedType(null)
            }, 300)
        }
    }

    const handleNext = () => {
        if (selectedType) setStep(2)
    }

    const handleBack = () => {
        setStep(1)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Gather form data
        const formData = new FormData(e.target as HTMLFormElement)
        const data = Object.fromEntries(formData)

        console.log(`Submitting ${selectedType} form:`, data)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button
                    className="relative py-3 text-base shadow-lg bg-red-900 hover:bg-red-700 text-gray-50 border border-gray-100"
                    size={"lg"}>
                    <PlusCircleIcon />
                    Create
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {step === 1 ? "Select Action" : `Create/Insert ${selectedType}`}
                    </DialogTitle>
                    <DialogDescription>
                        {step === 1
                            ? "What would you like to add to the gallery?"
                            : "Fill in the details below."}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-4">

                    {/* --- STEP 1: SELECTION --- */}
                    {step === 1 && (
                        <RadioGroup
                            onValueChange={(val: any) => setSelectedType(val as WizardType)}
                            className="grid grid-cols-1 gap-4"
                        >
                            {/* Option 1: Create Folder */}
                            <div>
                                <RadioGroupItem value="folder" id="folder" className="peer sr-only" />
                                <Label
                                    htmlFor="folder"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                                >
                                    <FolderPlus className="mb-2 h-6 w-6" />
                                    Create Folder
                                </Label>
                            </div>

                            {/* Option 2: Insert Image */}
                            <div>
                                <RadioGroupItem value="images" id="image" className="peer sr-only" />
                                <Label
                                    htmlFor="image"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                                >
                                    <ImageIcon className="mb-2 h-6 w-6" />
                                    Insert Image
                                </Label>
                            </div>

                            {/* Option 3: Insert Video */}
                            <div>
                                <RadioGroupItem value="videos" id="video" className="peer sr-only" />
                                <Label
                                    htmlFor="video"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                                >
                                    <Video className="mb-2 h-6 w-6" />
                                    Insert Video
                                </Label>
                            </div>
                        </RadioGroup>
                    )}

                    {/* --- STEP 2: CONDITIONAL FORMS --- */}
                    {step === 2 && (
                        <div className="space-y-4">

                            {/* FORM A: CREATE FOLDER (3 Fields) */}
                            {selectedType === "folder" && (
                                <>
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="folderName">Folder Name <span className="text-red-500 ml-0.5">*</span></Label>
                                        <Input id="folderName" name="folderName" required />
                                    </div>
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="thumbnail">Cover Image <span className="text-red-500 ml-0.5">*</span></Label>
                                        <Input id="thumbnail" name="thumbnail" type="file" accept="image/*" />
                                    </div>
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="memorytimestamp">MemoryCreatedAt <span className="text-red-500 ml-0.5">*</span></Label>
                                        <Input id="memorytimestamp" name="memorytimestamp" type="date" required />
                                    </div>
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="tags">Tags</Label>
                                        <Input id="tags" name="tags" placeholder="Comma separated" />
                                    </div>
                                </>
                            )}

                            {/* FORM B: INSERT IMAGE (4 Fields) */}
                            {selectedType === "images" && (
                                <>
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="imgFile">Upload Image(s) <span className="text-red-500 ml-0.5">*</span></Label>
                                        <Input id="imgFile" name="file" type="file" accept="image/*" required multiple />
                                    </div>
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="imgTitle">Title</Label>
                                        <Input id="imgTitle" name="title" />
                                    </div>
                                </>
                            )}

                            {/* FORM C: INSERT VIDEO (2 Fields) */}
                            {selectedType === "videos" && (
                                <>
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="vidFile">Upload Video(s) <span className="text-red-500 ml-0.5">*</span></Label>
                                        <Input id="vidFile" name="file" type="file" accept="video/*" required />
                                    </div>
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="vidCaption">Caption</Label>
                                        <Input id="vidCaption" name="caption" placeholder="Describe this video..." />
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {/* --- FOOTER --- */}
                    <DialogFooter className="flex justify-between sm:justify-between w-full">
                        {step === 2 ? (
                            <Button type="button" variant="outline" onClick={handleBack} className="gap-2">
                                <ArrowLeft className="h-4 w-4" /> Back
                            </Button>
                        ) : (
                            <div /> /* Empty div to push Next button to right */
                        )}

                        {step === 1 ? (
                            <Button type="button" onClick={handleNext} disabled={!selectedType}>
                                Next
                            </Button>
                        ) : (
                            <Button type="submit">Submit</Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}