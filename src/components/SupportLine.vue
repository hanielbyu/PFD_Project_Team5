<template>
    <!-- <a-radio-group v-model:value="tabPosition" style="margin: 8px">
      <a-radio-button value="top">top</a-radio-button>
      <a-radio-button value="bottom">bottom</a-radio-button>
      <a-radio-button value="left">left</a-radio-button>
      <a-radio-button value="right">right</a-radio-button>
    </a-radio-group> -->
    <div class="container-support">
        <a-tabs v-model:activeKey="activeKey" tab-position="left" animated>
            <a-tab-pane key="1" tab="John Doe">
                <LiveChatSupport />
            </a-tab-pane>

        <a-tab-pane key="2" tab="Jane Lee">
            <LiveChatSupport />
        </a-tab-pane>
            
        <a-tab-pane key="3" tab="Johnathan">
            <LiveChatSupport />
        </a-tab-pane>
        </a-tabs>
    </div>
</template>



  <script>
  import { ref, defineComponent } from 'vue';
  import LiveChatSupport from './LiveChatSupport.vue';



  export default defineComponent({

    components: {
    LiveChatSupport,
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

.container-support{
    margin-top: 80px;
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
    background-color: rgba(87, 87, 87, 0.527) !important;
    font-size: 18px !important;
}

.ant-tabs-tab:hover{
    background:rgb(207, 52, 52) !important;
}

.ant-tabs-tab-btn{
    color: white !important;
}
.ant-tabs-tab .ant-tabs-tab-active{
    color: white;

}

.ant-tabs-tab-active{
    background: rgba(0, 0, 0, 0.575) !important;
}


</style>