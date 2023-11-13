<template>
    <!-- <a-radio-group v-model:value="tabPosition" style="margin: 8px">
      <a-radio-button value="top">top</a-radio-button>
      <a-radio-button value="bottom">bottom</a-radio-button>
      <a-radio-button value="left">left</a-radio-button>
      <a-radio-button value="right">right</a-radio-button>
    </a-radio-group> -->
    <a-tabs v-model:activeKey="activeKey" tab-position="left" animated>
        <a-tab-pane key="1" tab="John Wick">
            <LiveChatSupport />
        </a-tab-pane>
      <a-tab-pane key="2" tab="Tab 2">Content of Tab 2</a-tab-pane>
      <a-tab-pane key="3" tab="Tab 3">Content of Tab 3</a-tab-pane>
    </a-tabs>
  </template>



  <script>
  import { ref, defineComponent } from 'vue';
  import LiveChatSupport from './LiveChatSupport.vue';



  export default defineComponent({

    components: {
        LiveChatSupport 
        },
    setup() {
        const activeKey = ref("1");
        return {
            activeKey,
            
        };
    },
})
 
  
  </script>


<style>

a-tabs{
    color: rgba(0, 0, 0, 0.267);
}


.ant-tabs-nav{
    height: 500px;
    width: 200px;
}
.ant-tabs-ink-bar{
    background-color: red !important;   
}

.ant-tabs-tab{
    color: white;
}

.ant-tabs-tab-btn{
    color: white !important;
}
.ant-tabs-tab .ant-tabs-tab-active{
    color: white;

}

.ant-tabs-tab-active{
    background: rgba(0, 0, 0, 0.274) !important;
}


</style>