import React from 'react';

export default () => {
  return (
    <Fragment>
      {this.isBack && <Icon type="arrow-left" onClick={this.onBackCreateDashboard} />}
      <span style={{ marginLeft: 10 }}>{$i18n.t('选择数据源')}</span>
      <span style={{ marginLeft: 10 }}>{$i18n.t('请选择卡片')}</span>
      <span style={{ marginLeft: 10 }}>{$i18n.t('确定')}</span>
      <span style={{ marginLeft: 10 }}>{$i18n.t('取消')}</span>
    </Fragment>
  );
};
