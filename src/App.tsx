import { useState, useEffect } from 'react';
import { Table, Layout, Typography, Spin, Alert, Button, Space, Popconfirm, message, Input } from 'antd';
import type { TableProps } from 'antd';
import { getTasks, deleteTask, searchTasksByName, executeTask, type Task } from './services/taskService';
import TaskForm from './components/TaskForm';
import ExecutionViewer from './components/ExecutionViewer'; // Import viewer
import { PlusOutlined, PlayCircleOutlined, EyeOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title } = Typography;
const { Search } = Input;

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError('Failed to fetch tasks. Please ensure the backend API is running on port 8090.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
      message.success('Task deleted successfully');
    } catch (err) {
      message.error('Failed to delete task');
    }
  };
  
  const handleExecute = async (taskId: string) => {
    const key = `executing-${taskId}`;
    message.loading({ content: 'Executing task...', key });
    try {
      const updatedTask = await executeTask(taskId);
      // Update the specific task in our state with the new execution data
      setTasks(tasks.map(task => task.id === taskId ? updatedTask : task));
      message.success({ content: 'Task executed successfully!', key });
    } catch (err) {
      message.error({ content: 'Failed to execute task', key });
    }
  };

  const handleSearch = async (value: string) => {
    setLoading(true);
    setError(null);
    try {
      const results = value ? await searchTasksByName(value) : await getTasks();
      setTasks(results);
    } catch (err) {
      setError('Failed to perform search.');
    } finally {
      setLoading(false);
    }
  };

  const handleTaskAdded = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  const openViewModal = (task: Task) => {
    setSelectedTask(task);
    setIsViewModalOpen(true);
  };

  const columns: TableProps<Task>['columns'] = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 250 },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Owner', dataIndex: 'owner', key: 'owner' },
    { title: 'Command', dataIndex: 'command', key: 'command', ellipsis: true },
    {
      title: 'Action',
      key: 'action',
      width: 280, // <-- ADD THIS LINE to give the column more space
      render: (_, record) => (
        <Space size="middle" wrap> {/* <-- ADD THE 'wrap' PROPERTY HERE */}
           <Button icon={<PlayCircleOutlined />} onClick={() => handleExecute(record.id)}>Run</Button>
           <Button icon={<EyeOutlined />} onClick={() => openViewModal(record)}>View History</Button>
          <Popconfirm title="Delete this task?" onConfirm={() => handleDelete(record.id)}>
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', backgroundColor: '#001529' }}>
        <Title level={3} style={{ color: 'white', margin: 0 }}>Kaiburr Task Manager</Title>
      </Header>
      <Content style={{ padding: '24px 48px' }}>
        <div style={{ backgroundColor: 'white', padding: 24, borderRadius: 8, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
          {error && <Alert message="API Error" description={error} type="error" showIcon closable style={{ marginBottom: 16 }} onClose={() => setError(null)} />}
          <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
            <Search placeholder="Search tasks by name" onSearch={handleSearch} style={{ width: 400 }} allowClear />
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsAddModalOpen(true)}>
              Add Task
            </Button>
          </Space>
          {loading ? <div style={{ textAlign: 'center', padding: '50px' }}><Spin size="large" tip="Loading Tasks..." /></div>
           : <Table columns={columns} dataSource={tasks} rowKey="id" bordered pagination={{ pageSize: 10 }} />}
        </div>
      </Content>
      <TaskForm isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onTaskAdded={handleTaskAdded} />
      <ExecutionViewer isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} task={selectedTask} />
    </Layout>
  );
};

export default App;