<template>
  <el-dialog>
    <el-form>
      <el-form-item v-for="item in formItems"
        :key="item.key"
        :label="item.label"
        :prop="item.key">
        <!-- 通过判断item的type展示不同的表单项 -->
        <el-select v-if="item.type=='select'"
          v-model="form[item.key]"
          style="width: 100%">
          <el-option v-for="op in item.options"
            :key="op.value"
            :label="op.label"
            :value="op.value"></el-option>
        </el-select>
        <el-input v-else
          v-model="form[item.key]"
          :disabled="item.disabled || (itemData && item.editDisabled)"
          :type="item.type || 'text'"
          :placeholder="item.placeholder">
        </el-input>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { reactive, toRaw } from 'vue'
import { ref, onMounted, watch } from 'vue'
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    formItems: {
      type: Array,
      required: true,
    },
    itemData: {
      type: Object,
    },
    propTitle: {
      type: String,
    },
  },
  emits: ['close', 'dialog-submit'],
  setup(props, { emit }) {
    const form = reactive({})
    const title = ref('编辑')
    watch(() => props.visible, () => {
      if (props.visible == true) {
        if (props.itemData) {
          title.value = '编辑'
        } else {
          title.value = '添加'
        }
        props.formItems.map((item) => {
          if (props.itemData && props.itemData[item.key] !== null) {
            form[item.key] = props.itemData[item.key]
          } else {
            form[item.key] = ''
          }
        })
      } else {
        Object.keys(form).map((key) => {
          delete form[key]
        })
      }
    })
    const close = () => {
      emit('close')
    }
    const ruleForm = ref()
    const saveEdit = async () => {
      ruleForm.value.validate((validte) => {
        if (validte) {
          emit('dialog-submit', form)
        } else {
          ElMessage.warning('请完善表格')
        }
      })
    }
    return {
      title,
      close,
      saveEdit,
      form,
      ruleForm,
    }
  },
}
</script>