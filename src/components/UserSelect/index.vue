<template>
  <treeselect
    :load-options="loadUserOrgs"
    :options="orgusers"
    :auto-load-root-options="autoload"
    :value="value"
    :multiple="multiple"
    :show-count="false"
    value-consists-of="LEAF_PRIORITY"
    no-children-text="空记录"
    retry-text="重试"
    :value-format="format"
    placeholder="请选择用户"
    @input="handleInput"
    @select="handleSelect"
    :normalizer="normalizer"
    :disable-branch-nodes="false"
    :flat="true"    
    :default-expand-level="1"
  />
</template>
<script>
  import Treeselect from "@riophae/vue-treeselect"
  import "@riophae/vue-treeselect/dist/vue-treeselect.css"
  import { listBusiness } from "@/api/example/index"
  export default {
    name: "UserSelect",
    components: { Treeselect },
    props: {
      value: {
        required: false
      },
      format: {
        required: false,
        type: String,
        default: "object"
      },
      multiple: {
        required: false,
        type: Boolean,
        default: false
      },
      autoload: {
        required: false,
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        orgusers: null,
        normalizer(node) {
          console.log('normalizer:',node)
          node.label = node.label || node.name
          return node
        }
      }
    },
    methods: {
      handleInput(value, instanceId) {
        console.log('handleInput', value)
        var node = value
        if (node.oid) {
          var str = JSON.stringify(value)
          //console.log('selected value: ', str)
          node = JSON.parse(str)
          node.id = node.oid //还原用户id
          delete node.oid
        }
        //console.log(JSON.stringify(node))
        this.$emit("input", node)
      },
      handleDeselect(node, instanceId) {
      },
      handleSelect(node2, instanceId) {
        console.log('node2', node2)
        var str = JSON.stringify(node2)
        var node = JSON.parse(str)
        node.id = node.oid //还原用户id
        delete node.oid
        //console.log("user node2:", node)
        //支持v-model方式
        //console.log("input :", JSON.stringify(this.value))
        if (this.multiple) {
          //this.value.push(node)
          this.$emit("input", this.value)
        } else {
          this.$emit("input", node)
        }
        //this.$emit('update:org',node)
      },
      loadUserOrgs({action, parentNode, callback}) {
        console.log(action, parentNode, this.org)
        var self = this
        var pid = 'test'
        if (action !== "LOAD_ROOT_OPTIONS") {
          pid = parentNode.oid
        }
        if (this.$store.getters.activityId) {
          listBusiness({ "activityId": this.$store.getters.activityId }).then(response => {
            console.log("response:::", response)
            //   const data = response.data
            //   var olist = data.offices
            //   var ulist = data.users
            //   if (olist.length === 0) {
            //     if (pid) parentNode.children = []
            //     //组织机构禁用
            //     parentNode.isDisabled = true
            //     callback()
            //     return
            //   }
            //   //子部门
            //   var orgs = []
            //   for (var i in olist) {
            //     orgs.push({
            //       id: "o" + olist[i].id,
            //       oid: olist[i].id,
            //       name: olist[i].name,
            //       label: olist[i].name,
            //       children: null
            //     })
            //   }
            //   //部门用户
            //   for (var j in ulist) {
            //     orgs.push({
            //       id: "u" + ulist[j].id,
            //       oid: ulist[j].id,
            //       name: ulist[j].name,
            //       label: ulist[j].name,
            //       children: undefined
            //     })
            //   }
            //   if (pid) {
            //     parentNode.children = orgs
            //   } else {
            //     self.orgusers = orgs
            //   }
            //   callback()
            if (response) {
              // this.orgusers = response.body;
              this.orgusers = [ {
                id: 'a',
                label: 'a',
                children: undefined,
              }, {
                id: 'b',
                label: 'b',
              }, {
                id: 'c',
                label: 'c',
              } ];
              callback()
            }
          }).catch(error => {
            console.log(error)
            callback()
          })
        } else {
          this.$Message.warning("请先选择活动")
        }
      }
    }
  }
</script>

<style scoped>
</style>
