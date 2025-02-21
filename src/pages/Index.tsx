
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import FormModal from '@/components/FormModal';
import { ReferenceObject, FieldDefinition } from '@/types/form';
import { motion } from 'framer-motion';

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const claimObject: ReferenceObject = {
    urgency: 'high',
    name: 'Tomo',
    creditCardNumber: '123456789',
    options: [
      {caption: 'ignore', value: 1, selected: true},
      {caption: 'callback', value: 2, selected: false},
      {caption: 'talk to manager', value: 3, selected: false}
    ]
  };

  const fieldDefinitions: FieldDefinition[] = [
    {fieldName: null, type: 'filler', value: 'Please review the following information:'},
    {fieldName: 'urgency', type: 'button'},
    {fieldName: 'name', type: 'display'},
    {fieldName: 'options', type: 'radio'}
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Form Builder Demo</h1>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Open Form
        </Button>

        <FormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          referenceObject={claimObject}
          fieldDefinitions={fieldDefinitions}
        />
      </motion.div>
    </div>
  );
};

export default Index;
