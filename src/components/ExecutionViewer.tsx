import { Modal, List, Typography, Tag, Empty } from 'antd';
import { type Task } from '../services/taskService';

const { Text } = Typography;

interface ExecutionViewerProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

const ExecutionViewer = ({ task, isOpen, onClose }: ExecutionViewerProps) => {
  if (!task) return null;

  return (
    <Modal
      title={`Execution History for: ${task.name}`}
      open={isOpen}
      onCancel={onClose}
      footer={null} // No OK/Cancel buttons needed
      width={800} // A wider modal for code output
    >
      {task.taskExecutions && task.taskExecutions.length > 0 ? (
        <List
          itemLayout="vertical"
          dataSource={task.taskExecutions}
          renderItem={(item, index) => (
            <List.Item key={index}>
              <List.Item.Meta
                title={<Text strong>Execution {index + 1}</Text>}
                description={
                  <span>
                    <Tag color="blue">Start: {new Date(item.startTime).toLocaleString()}</Tag>
                    <Tag color="green">End: {new Date(item.endTime).toLocaleString()}</Tag>
                  </span>
                }
              />
              <pre style={{ 
                backgroundColor: '#f5f5f5', 
                padding: '12px', 
                borderRadius: '4px', 
                whiteSpace: 'pre-wrap', // Wraps long lines
                wordBreak: 'break-all', // Breaks long words/strings
                maxHeight: '300px',
                overflowY: 'auto'
              }}>
                <code>{item.output}</code>
              </pre>
            </List.Item>
          )}
        />
      ) : (
        <Empty description="No execution history found for this task." />
      )}
    </Modal>
  );
};

export default ExecutionViewer;