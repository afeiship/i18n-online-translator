import React from 'react';

export default () => {
  return (
    <Fragment>
      {this.isBack && <Icon type="arrow-left" onClick={this.onBackCreateDashboard} />}
      <span style={{ marginLeft: 10 }}>{$i18n.t('选择数据源')}</span>
    </Fragment>
  );
};
