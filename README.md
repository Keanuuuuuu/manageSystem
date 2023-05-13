# manageSystem

monitoring中列表上部分的功能按钮为了“为了组件化”把它们进行了拆分
* Monitor_display_control
* Monitor_display_head
这样的话就难免会涉及没有进行组件拆分而造成的传值，目前是每一个需要传递的值，比如控制Dialog显示与Dialog中是否显示该按钮功能的内部dialog，都绑定一个自定义事件，后面可能会用Vuex进行管理，这样写始终是感觉不对的……