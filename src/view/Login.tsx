import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input } from 'antd';
import { login } from '@/api/modules/login';
import bgImg from '@/assets/bg.jpg.webp';
import logoImg from '@/assets/logo-64.svg';
import { SHA3Encrypt } from '@/libs/crypto';
import { ResultData } from '@/types/http.d';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

interface loginForm {
  username: string;
  password: string;
  remember: boolean;
}

function Login() {
  const navigate = useNavigate();
  const onFinish = (values: loginForm) => {
    console.log(values);
    const { username, password, remember } = values;
    const decodedPassword = SHA3Encrypt(JSON.stringify({ username, password }));
    login({ username, password: decodedPassword }).then((res) => {
      const { success, message, data } = res.data as ResultData;
      console.log(success, message, data);

      navigate('/sandbox');
    });
  };
  return (
    <>
      <div
        className="w-full h-full relative bg-cover"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <div className="bg-white/70 w-[400px] h-[430px] absolute left-0 top-0 right-0 bottom-0 m-auto backdrop-blur-md flex flex-col p-24px rounded">
          <div className="flex flex-col items-center mb-36px">
            <img src={logoImg} width={64} height={64} />
            <p className="text-24px text-transparent bg-gradient-to-r from-purple to-blue bg-clip-text">
              OxygenTool
            </p>
          </div>
          <Form initialValues={{ remember: true }} onFinish={onFinish}>
            <Form.Item
              label=""
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input
                className="h-40px"
                prefix={<UserOutlined className="text-black/25" />}
                placeholder="请输入用户名"
              />
            </Form.Item>
            <Form.Item
              label=""
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password
                className="h-40px"
                prefix={<LockOutlined className="text-black/25" />}
                placeholder="请输入密码"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住密码</Checkbox>
              </Form.Item>
              <a href="" className="text-primary float-right">
                忘记密码
              </a>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-primary w-full h-40px"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="absolute bottom-[32px] w-full text-center h-[24px] leading-[24px] text-neutral-300 text-xs">
          Copyright © 2023 Furoe All rights reserved.
        </div>
      </div>
    </>
  );
}

export default Login;
