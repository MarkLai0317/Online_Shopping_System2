<template>
  <div class="common-layout">
    <el-container>
      <el-main id="back">
      <el-header>Header</el-header>
      <el-main>Main</el-main>
      </el-main>
    </el-container>
  </div>
</template>

<style>
.el-container{
  width: 550px;
  margin-left: auto;
  margin-right: auto;
}
.el-header{
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 160px;
}
#back{
  background-color: #1389ff;
  width: 100%;
}

</style>
