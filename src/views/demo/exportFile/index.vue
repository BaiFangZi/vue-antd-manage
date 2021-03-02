<template>
  <div>
    <div style="margin-bottom: 16px">
      <a-button type="primary" :loading="loading" @click="handleExportExcelFile">
        导出Excel文件
      </a-button>
    </div>
    <a-table :columns="columns" :data-source="data" />
  </div>
</template>
<script>
import { export_json_to_excel } from '@/plugins/Export2Excel'
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

export default {
  data () {
    return {
      data,
      columns,
      loading: false,
    };
  },

  methods: {
    handleExportExcelFile () {
      this.loading = true;
      const exportName = '表格数据'
      const exportHeader = ['name', 'age', 'address']
      const exportData = this.data.map(item => [item.name, item.age, item.address])
      export_json_to_excel(exportHeader, exportData, exportName)
      // this.loading = false
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },

  },
};
</script>
