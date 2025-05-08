import { Dialog, DialogContent, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {  useState } from "react";
import { useAuth } from "../context/AuthContext";
import { instance } from "@/api/axiosInstance";
import { toast } from "sonner"; // Optional: Replace with your toast lib

type ProfileUpdateModalProps = {
  open: boolean;
  onClose: () => void;
};

function ProfileUpdateModal({ open, onClose }: ProfileUpdateModalProps) {
  const [name, setName] = useState<string>("");
  const { userData, setUserData } = useAuth();


  const handleUpdate = async (id: string) => {
    try {
      const res = await instance.patch(`user/${id}`, { name });
      setUserData(res.data); 
      toast.success("Profile updated successfully");
      onClose(); 
    } catch (err) {
      toast.error("Failed to update profile");
      console.error("Update failed", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[500px] p-10">
        <Input
          id="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <DialogFooter className="flex justify-end">
          <Button
            type="button"
            variant="secondary"
            className="bg-[#1689FE] text-white"
            onClick={() => handleUpdate(userData.id)}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ProfileUpdateModal;
