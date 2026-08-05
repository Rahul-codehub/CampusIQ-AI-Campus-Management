import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { SEMESTERS } from "../constants";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Plus } from "lucide-react";

import type { StudentDialogProps } from "../types";

export default function StudentDialog({
    open,
    setOpen,
    form,
    setForm,
    departments,
    onSubmit,
    loading,
    title,
    submitText,
}: StudentDialogProps) {
    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Student
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={onSubmit}
                    className="space-y-4"
                >
                    <div>
                        <Label>Student ID</Label>

                        <Input
                            value={form.student_id}
                            onChange={(e) =>
                                setForm((prev) => ({
                                    ...prev,
                                    student_id: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <div>
                        <Label>Full Name</Label>

                        <Input
                            value={form.full_name}
                            onChange={(e) =>
                                setForm((prev) => ({
                                    ...prev,
                                    full_name: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <div>
                        <Label>Email</Label>

                        <Input
                            type="email"
                            value={form.email}
                            onChange={(e) =>
                                setForm((prev) => ({
                                    ...prev,
                                    email: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <div>
                        <Label>Mobile</Label>

                        <Input
                            value={form.mobile}
                            onChange={(e) =>
                                setForm((prev) => ({
                                    ...prev,
                                    mobile: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <div>
                        <Label>Department</Label>

                        <Select
                            value={form.department_id}
                            onValueChange={(value) =>
                                setForm((prev) => ({
                                    ...prev,
                                    department_id: value,
                                }))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Department" />
                            </SelectTrigger>

                            <SelectContent>
                                {departments.map((dept) => (
                                    <SelectItem
                                        key={dept.id}
                                        value={dept.id}
                                    >
                                        {dept.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label>Semester</Label>

                        <Select
                            value={form.semester}
                            onValueChange={(value) =>
                                setForm((prev) => ({
                                    ...prev,
                                    semester: value,
                                }))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Semester" />
                            </SelectTrigger>

                            <SelectContent>
                                {SEMESTERS.map((semester) => (
                                    <SelectItem
                                        key={semester}
                                        value={semester}
                                    >
                                        Semester {semester}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>


                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loading}
                    >
                        {loading
                            ? "Please wait..."
                            : submitText}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}