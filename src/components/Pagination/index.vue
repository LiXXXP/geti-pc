<template>
  <br />
  <div class="pagination">
    <el-pagination
      background
      small
      :page-size="props.pageSize"
      :total="props.total"
      :layout="props.layout"
      :page-sizes="pageSizes"
      :pager-count="11"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
  <br />
</template>

<script lang="ts" setup>
const props = defineProps({
  currentPage: {
    type: Number,
    default: 1,
    required: false
  },
  pageSize: {
    type: Number,
    default: 10,
    required: false
  },
  total: {
    type: Number,
    default: 0,
    required: false
  },
  layout: {
    type: String,
    default: 'total,prev,pager,next,sizes,jumper',
    required: false
  },
  pageSizes: {
    type: Array,
    default: () => [10, 20, 50, 100],
    required: false
  }
})

const emit = defineEmits(['sizeChange', 'currentChange'])

const handleSizeChange = (val: number) => {
  emit('sizeChange', val)
}
const handleCurrentChange = (val: number) => {
  emit('currentChange', val)
}
</script>

<style lang="scss" scoped>
.pagination {
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
