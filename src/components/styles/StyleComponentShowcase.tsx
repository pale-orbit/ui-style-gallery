import React from 'react';
import { StyledButton } from './StyledButton';
import { StyledInput } from './StyledInput';
import { StyledSwitch } from './StyledSwitch';
import { StyledProgress } from './StyledProgress';
import { StyledCard } from './StyledCard';
import { StyledTabs } from './StyledTabs';
import { useModal, StyledModal } from './StyledModal';
import { StyledNav } from './StyledNav';
import { ComponentGroup, componentGroupNames } from '@/types';
import { Sparkles, User, Mail, Lock, Search } from 'lucide-react';

interface StyleComponentShowcaseProps {
  group: ComponentGroup;
}

export const StyleComponentShowcase: React.FC<StyleComponentShowcaseProps> = ({ group }) => {
  const modal = useModal();

  const basicControls = (
    <div className="space-y-6">
      <div className="space-y-3">
        <h4 className="text-sm font-semibold opacity-70 mb-2">按钮 Buttons</h4>
        <div className="flex flex-wrap gap-3">
          <StyledButton variant="primary">主要按钮</StyledButton>
          <StyledButton variant="secondary">次要按钮</StyledButton>
          <StyledButton variant="outline">轮廓按钮</StyledButton>
          <StyledButton variant="ghost">幽灵按钮</StyledButton>
        </div>
        <div className="flex flex-wrap gap-3">
          <StyledButton variant="primary" disabled>
            禁用状态
          </StyledButton>
          <StyledButton variant="primary" onClick={modal.open}>
            <Sparkles size={16} className="mr-2" />
            打开弹窗
          </StyledButton>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-semibold opacity-70 mb-2">开关与进度 Switches & Progress</h4>
        <div className="flex flex-wrap gap-6 items-center">
          <StyledSwitch label="开启选项" defaultChecked />
          <StyledSwitch label="关闭选项" />
        </div>
        <div className="space-y-4">
          <StyledProgress value={35} />
          <StyledProgress value={75} />
          <StyledProgress value={100} />
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-semibold opacity-70 mb-2">标签页 Tabs</h4>
        <StyledTabs
          tabs={[
            { id: 'tab1', label: '概览' },
            { id: 'tab2', label: '详情' },
            { id: 'tab3', label: '设置' },
          ]}
        />
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-semibold opacity-70 mb-2">导航栏 Navigation</h4>
        <StyledNav />
      </div>
    </div>
  );

  const formGroup = (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-sm font-semibold opacity-70 mb-2">输入框 Inputs</h4>
        <div className="space-y-3 max-w-md">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <User size={14} /> 用户名
            </label>
            <StyledInput placeholder="请输入用户名" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Mail size={14} /> 邮箱
            </label>
            <StyledInput type="email" placeholder="example@email.com" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Lock size={14} /> 密码
            </label>
            <StyledInput type="password" placeholder="请输入密码" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Search size={14} /> 搜索
            </label>
            <StyledInput placeholder="搜索内容..." />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-semibold opacity-70 mb-2">表单选项 Form Options</h4>
        <div className="space-y-3">
          <StyledSwitch label="接收通知邮件" defaultChecked />
          <StyledSwitch label="开启双重验证" />
          <StyledSwitch label="记住登录状态" defaultChecked />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <StyledButton variant="primary">提交表单</StyledButton>
        <StyledButton variant="secondary">重置</StyledButton>
      </div>
    </div>
  );

  const dataGroup = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StyledCard title="数据统计">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm opacity-70">总用户数</span>
              <span className="text-xl font-bold">12,847</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm opacity-70">今日活跃</span>
              <span className="text-xl font-bold">3,256</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm opacity-70">转化率</span>
              <span className="text-xl font-bold">24.8%</span>
            </div>
            <StyledProgress value={68} showLabel={false} />
          </div>
        </StyledCard>

        <StyledCard title="项目概览">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm opacity-70">进行中</span>
              <span className="text-lg font-semibold">15</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm opacity-70">已完成</span>
              <span className="text-lg font-semibold">48</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm opacity-70">待审核</span>
              <span className="text-lg font-semibold">7</span>
            </div>
            <StyledProgress value={76} showLabel={false} />
          </div>
        </StyledCard>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-semibold opacity-70 mb-2">列表数据 List Data</h4>
        <div className="space-y-2">
          {[
            { name: '设计系统重构', status: '进行中', progress: 65 },
            { name: '用户体验优化', status: '审核中', progress: 90 },
            { name: '性能提升计划', status: '已完成', progress: 100 },
          ].map((item, idx) => (
            <StyledCard key={idx}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs opacity-60">{item.status}</div>
                </div>
                <StyledProgress value={item.progress} showLabel={false} className="w-24" />
              </div>
            </StyledCard>
          ))}
        </div>
      </div>
    </div>
  );

  const renderGroup = () => {
    switch (group) {
      case 'basic':
        return basicControls;
      case 'form':
        return formGroup;
      case 'data':
        return dataGroup;
      default:
        return basicControls;
    }
  };

  return (
    <div>
      <div className="mb-4 text-xs opacity-60 uppercase tracking-wider">
        {componentGroupNames[group]}
      </div>
      {renderGroup()}
      <StyledModal isOpen={modal.isOpen} onClose={modal.close} title="示例弹窗">
        <p className="text-sm opacity-80">
          这是一个使用当前风格渲染的弹窗示例。您可以看到弹窗的样式、按钮、阴影效果等都遵循了当前风格的设计语言。
        </p>
      </StyledModal>
    </div>
  );
};
