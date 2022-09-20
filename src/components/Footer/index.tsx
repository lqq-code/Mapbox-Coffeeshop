import { Footer } from 'antd/lib/layout/layout';

export default () => {
  const renderFooter = () => {
    const year = new Date().getFullYear();
    return (
      <Footer className="tc">
        Copyright&nbsp;&copy;&nbsp;2015-{year}&nbsp;
        <a href="https://www.creditx.com/" target="_blank" rel="noopener noreferrer">
          上海氪信信息技术有限公司
        </a>
        &nbsp;版权所有&nbsp;沪ICP备16001598号
      </Footer>
    );
  };

  return <div style={{ textAlign: 'center' }}>{renderFooter()}</div>;
};
