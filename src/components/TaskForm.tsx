import { Modal, Form, Input, message } from 'antd';
import { createTask, type Task } from '../services/taskService';

// Define the props our component will accept
interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskAdded: (newTask: Task) => void;
}

const TaskForm = ({ isOpen, onClose, onTaskAdded }: TaskFormProps) => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setIsSubmitting(true);
      
      // We don't have an ID yet for a new task
      const newTaskData: Omit<Task, 'id'> = {
        name: values.name,
        owner: values.owner,
        command: values.command,
      };

      const addedTask = await createTask(newTaskData);
      
      message.success('Task created successfully!');
      onTaskAdded(addedTask); // Pass the new task back to the parent
      form.resetFields();
      onClose();
    } catch (error) {
      console.error('Failed to create task:', error);
      message.error('Failed to create task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Add New Task"
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={isSubmitting}
    >
      <Form form={form} layout="vertical" name="task_form">
        <Form.Item
          name="name"
          label="Task Name"
          rules={[{ required: true, message: 'Please input the task name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="owner"
          label="Owner"
          rules={[{ required: true, message: 'Please input the owner!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="command"
          label="Command"
          rules={[{ required: true, message: 'Please input the command!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
// We need to import useState
import { useState } from 'react';
export default TaskForm;