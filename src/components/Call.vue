<template>
  <div id="container">

        <div id="room-header">
          <!-- <h1 id="room-name"></h1> -->
          <div id="room-header-controls">
            <img id="mic-icon" class="control-icon" src="icons/mic-off.svg" />
            <img id="leave-icon" class="control-icon" src="icons/leave.svg" />
          </div>
        </div>
    
        <form id="form">
          <div id="avatars">
              <img class="avatar-selection" src="avatars/male-1.png"/>
          </div> 

          <div id="form-fields">
              <input required name="displayname" type="text" placeholder="Enter Name" />
              <input class="hideInput" name="roomname" type="text" placeholder="Enter room name..."/>

              <div style="border: 1px solid #DDD;">
                  <font-awesome-icon class="phone-icon" :icon="['fas', 'phone']" />
                  <input class="startCall" name="username" type="submit" value="call" style="border:none; background-color: transparent;"/>
              </div>
          </div>
      </form>
    
        <div id="members">
    
        </div>
    </div>
</template>

<script>
import { callBackend } from "@/helpers/call-backend";
import { ref, onMounted } from 'vue';

export default {
  setup() {
    // const name = ref('haniel')
    // const room = ref('test')
    // const open = ref(false);
    // const showModal = () => {
    //   open.value = true;
    // };
    // const handleOk = e => {
    //   console.log(e);
    //   open.value = false;
    // };

    onMounted(async () => {
      // document.getElementById('form').displayname.value = name.value
      // document.getElementById('form').roomname.value = room.value
      callBackend()
    })

    return{
      // showModal,
      // handleOk,
      // open,
      // name,
      // room
    }
  }
}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

:root {
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  color-scheme: dark;
  color: rgba(255, 255, 255, 0.87);
}

a {
  color: #646cff;
  text-decoration: none;
}
a:hover {
  color: #535bf2;
}

body {
  margin: 0;
}

#container{
  max-width: 800px;
  margin: 0 auto;
  padding: 1em;
}

#room-header{
  justify-content: space-between;
  align-items: center;
  padding: 1em 0;
  display: none;
}

#room-header-controls{
  display: flex;
}

#room-header-controls > img {
  margin: 0 2px;
}

.control-icon{
  background-color: indianred;
  border: none;
  padding: 0.5em;
  height: 30px;
  cursor: pointer;
  border-radius: 5px;
}



#members{
  display: flex;
  flex-wrap: wrap;
}

.speaker{
  /* border:2px solid #fff;
  border-radius: 50%; */

  margin: 0.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
  text-align: center;
}

#avatars{
  display: flex;
  flex-wrap: wrap;
  float: left;
  margin: 0;
  margin-right: 20px;
}

.avatar-selection{
  height: 50px;
  width: 50px;
  object-fit: contain;
  border: 2px solid #FFF;
  border-radius: 50%;
  opacity: .5;
  cursor: pointer;
  margin: 0.25em;
}

.user-avatar{
  height: 75px;
  width: 75px;
  object-fit: contain;
  border: 2px solid #FFF;
  border-radius: 50%;
}

/* #form input{
  width: 100%;
  padding: 1em;
  margin-bottom:2em;
  box-sizing: border-box;
} */

#form label{
  margin-bottom: 0.5em;
}

#form-fields{
  display: flex;
  flex-direction: column;
}

.hideInput{
  display: none;
}
</style>