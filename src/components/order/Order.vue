<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索框区域 -->
      <el-row>
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getOrderList"
            @keyup.13.native="searchOrder"
            @input="inputOrder"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchOrder"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>

      <!-- 订单列表表单区域 -->
      <el-table :data="orderList" style="width: 100%" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="order_number" label="订单编号" width="180">
        </el-table-column>
        <el-table-column prop="order_price" label="订单价格" width="180">
        </el-table-column>
        <el-table-column prop="pay_status" label="是否付款">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.pay_status === '1'"
              >已付款</el-tag
            ><el-tag type="danger" v-else>未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货"> </el-table-column>
        <el-table-column prop="create_time" label="下单时间">
          <template slot-scope="scope">
            {{ scope.row.create_time | dateFormMat }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="showEditDialog"
          ></el-button
          ><el-button
            type="success"
            icon="el-icon-location"
            size="mini"
            @click="showProgressBox"
          ></el-button>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="orderSizeChange"
        @current-change="orderPageChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      >
      </el-pagination>

      <!-- 修改地址的对话框 -->
      <el-dialog
        title="修改地址"
        :visible.sync="editDialogVisible"
        width="50%"
        @close="addressDialogClosed"
      >
        <el-form
          :model="editAddressForm"
          :rules="editAddressFormRules"
          ref="editAddressFormRef"
          label-width="100px"
        >
          <el-form-item label="省市区/县" prop="address1">
            <el-cascader
              v-model="editAddressForm.address1"
              :options="cityData"
              :props="{ expandTrigger: 'hover' }"
              @change="editCascaderChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址" prop="address2">
            <el-input v-model="editAddressForm.address2"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editDialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>

      <!-- 物流进度的对话框 -->
      <el-dialog title="物流进度" :visible.sync="progressVisible" width="50%">
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in progressInfo"
            :key="index"
            :timestamp="activity.time"
          >
            {{ activity.context }}
          </el-timeline-item>
        </el-timeline>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import cityData from './city_data2017_element'
export default {
  data() {
    return {
      // 订单列表查询对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5,
      },
      // 订单列表数据
      orderList: [],
      total: 0,
      // 修改地址对话框的表单对象
      editAddressForm: {
        address1: [],
        address2: '',
      },
      // 修改地址对话框的表单校验对象
      editAddressFormRules: {
        address1: [
          { required: true, message: '请选择省市区县', trigger: 'blur' },
        ],
        address2: [
          { required: true, message: '请填写详细地址', trigger: 'blur' },
        ],
      },
      // 控制修改地址对话框的显示与隐藏
      editDialogVisible: false,
      // 储存城市的数组
      cityData,
      // 控制物流进度对话框的显示与隐藏
      progressVisible: false,
      // 储存物流信息的数组
      progressInfo: [
        {
          time: '2018-05-10 09:39:00',
          ftime: '2018-05-10 09:39:00',
          context: '已签收,感谢使用顺丰,期待再次为您服务',
          location: '',
        },
        {
          time: '2018-05-10 08:23:00',
          ftime: '2018-05-10 08:23:00',
          context:
            '[北京市]北京海淀育新小区营业点派件员 顺丰速运 95338正在为您派件',
          location: '',
        },
        {
          time: '2018-05-10 07:32:00',
          ftime: '2018-05-10 07:32:00',
          context: '快件到达 [北京海淀育新小区营业点]',
          location: '',
        },
        {
          time: '2018-05-10 02:03:00',
          ftime: '2018-05-10 02:03:00',
          context:
            '快件在[北京顺义集散中心]已装车,准备发往 [北京海淀育新小区营业点]',
          location: '',
        },
        {
          time: '2018-05-09 23:05:00',
          ftime: '2018-05-09 23:05:00',
          context: '快件到达 [北京顺义集散中心]',
          location: '',
        },
        {
          time: '2018-05-09 21:21:00',
          ftime: '2018-05-09 21:21:00',
          context: '快件在[北京宝胜营业点]已装车,准备发往 [北京顺义集散中心]',
          location: '',
        },
        {
          time: '2018-05-09 13:07:00',
          ftime: '2018-05-09 13:07:00',
          context: '顺丰速运 已收取快件',
          location: '',
        },
        {
          time: '2018-05-09 12:25:03',
          ftime: '2018-05-09 12:25:03',
          context: '卖家发货',
          location: '',
        },
        {
          time: '2018-05-09 12:22:24',
          ftime: '2018-05-09 12:22:24',
          context: '您的订单将由HLA（北京海淀区清河中街店）门店安排发货。',
          location: '',
        },
        {
          time: '2018-05-08 21:36:04',
          ftime: '2018-05-08 21:36:04',
          context: '商品已经下单',
          location: '',
        },
      ],
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    // 获取订单列表数据
    async getOrderList() {
      const { data: res } = await this.$http.get('orders', {
        params: this.queryInfo,
      })
      if (res.meta.status !== 200) {
        this.$message.error('获取订单数据列表失败！')
      }
      this.orderList = res.data.goods
      this.total = res.data.total
    },

    //监听每页条数变化触发的函数
    orderSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getOrderList()
    },

    //监听页码变化触发的函数
    orderPageChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getOrderList()
    },

    //模糊搜索
    searchOrder() {
      this.orderList = this.orderList.filter((item) => {
        // console.log(item)
        return item.order_number.indexOf(this.queryInfo.query) !== -1
      })
    },

    //解决输入全部删除后的bug
    inputOrder() {
      if (this.queryInfo.query === '') {
        this.getOrderList()
      }
    },

    // 展示修改地址的对话框
    showEditDialog() {
      this.editDialogVisible = true
    },

    //关闭对话框清空表单
    addressDialogClosed() {
      this.$refs.editAddressFormRef.resetFields()
    },

    // 修改地址对话框中的级联选择器选项发生变化时触发的函数
    editCascaderChange() {},

    //显示物流进度的对话框
    showProgressBox() {
      // const { data: res } = await this.$http.get('/kuaidi/')
      // if (res.meta.status !== 200) {
      //   this.$message.error('获取物流信息失败！')
      // }
      // this.progressInfo = res.data
      this.progressVisible = true
    },
  },
}
</script>
<style lang="less" scoped>
.el-cascader {
  width: 100%;
}
</style>
