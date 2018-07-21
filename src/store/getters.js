import { stat } from "fs";

const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,

  viplevellist :state=>state.vip.viplevellist,//vip等级列表



}
export default getters
