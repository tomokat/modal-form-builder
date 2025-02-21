
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ReferenceObject, FieldDefinition } from '@/types/form';
import { motion } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  referenceObject: ReferenceObject;
  fieldDefinitions: FieldDefinition[];
}

const FormModal: React.FC<FormModalProps> = ({
  isOpen,
  onClose,
  referenceObject,
  fieldDefinitions,
}) => {
  const { toast } = useToast();

  const handleSubmit = () => {
    toast({
      title: "Form Submitted",
      description: "Your form has been successfully submitted.",
    });
    onClose();
  };

  const renderField = (field: FieldDefinition) => {
    switch (field.type) {
      case 'filler':
        return (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gray-600 my-4"
          >
            {field.value}
          </motion.p>
        );
      case 'button':
        return (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="my-4"
          >
            <Button
              variant="outline"
              className="hover:bg-gray-100 transition-colors"
            >
              {field.fieldName ? referenceObject[field.fieldName] : 'Button'}
            </Button>
          </motion.div>
        );
      case 'display':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="my-4"
          >
            <Label className="text-sm font-medium text-gray-500">
              {field.fieldName}
            </Label>
            <p className="mt-1 text-lg">
              {field.fieldName ? referenceObject[field.fieldName] : ''}
            </p>
          </motion.div>
        );
      case 'radio':
        if (!field.fieldName || !Array.isArray(referenceObject[field.fieldName])) {
          return null;
        }
        const options = referenceObject[field.fieldName] as any[];
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="my-6"
          >
            <Label className="text-sm font-medium text-gray-500 mb-3 block">
              Select an option
            </Label>
            <RadioGroup defaultValue={options.find(opt => opt.selected)?.value?.toString()}>
              {options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={option.value?.toString() || option.caption} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="text-gray-700">
                    {option.caption}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Custom Form</DialogTitle>
          <DialogDescription className="text-gray-500">
            Please fill out the form below
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          {fieldDefinitions.map((field, index) => (
            <div key={index} className="mb-4">
              {renderField(field)}
            </div>
          ))}
        </div>

        <DialogFooter className="flex space-x-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={handleSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FormModal;
