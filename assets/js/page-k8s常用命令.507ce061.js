(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{551:function(t,e,v){"use strict";v.r(e);var _=v(1),d=Object(_.a)({},(function(){var t=this,e=t.$createElement,v=t._self._c||e;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("table",[v("thead",[v("tr",[v("th",[t._v("作用")]),t._v(" "),v("th",[t._v("命令")]),t._v(" "),v("th",[t._v("说明")])])]),t._v(" "),v("tbody",[v("tr",[v("td",[t._v("查看节点状态")]),t._v(" "),v("td",[v("code",[t._v("kubectl get nodes")])]),t._v(" "),v("td")]),t._v(" "),v("tr",[v("td",[t._v("应用某个 yaml 文件")]),t._v(" "),v("td",[v("code",[t._v("kubectl apply -f xxx.yaml")])]),t._v(" "),v("td")]),t._v(" "),v("tr",[v("td",[t._v("删除已经应用的 yaml 文件")]),t._v(" "),v("td",[v("code",[t._v("kubectl delete -f xxx.yaml")])]),t._v(" "),v("td")]),t._v(" "),v("tr",[v("td",[t._v("查看 xxx 空间下的 pod")]),t._v(" "),v("td",[v("code",[t._v("kubectl get pods -n xxx")])]),t._v(" "),v("td")]),t._v(" "),v("tr",[v("td",[t._v("查看 某个 pod 运行状态")]),t._v(" "),v("td",[v("code",[t._v("kubectl get pod my-nginx-684bd4f4c-jnzdd -o wide -n test")])]),t._v(" "),v("td")]),t._v(" "),v("tr",[v("td",[t._v("查看 pod 详细信息")]),t._v(" "),v("td",[v("code",[t._v("kubectl describe pod -n kube-system kube-flannel-ds-amd64-c4h6p")])]),t._v(" "),v("td",[v("code",[t._v("kube-system")]),t._v(" 是空间名称，"),v("code",[t._v("kube-flannel-ds-amd64-c4h6p")]),t._v(" 是 pod 名称。")])])])]),t._v(" "),v("h2",{attrs:{id:"空间命令"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#空间命令"}},[t._v("#")]),t._v(" 空间命令")]),t._v(" "),v("table",[v("thead",[v("tr",[v("th",[t._v("作用")]),t._v(" "),v("th",[t._v("命令")]),t._v(" "),v("th",[t._v("说明")])])]),t._v(" "),v("tbody",[v("tr",[v("td",[t._v("列举所有空间")]),t._v(" "),v("td",[v("code",[t._v("kubectl get ns")])]),t._v(" "),v("td",[t._v("-")])]),t._v(" "),v("tr",[v("td",[t._v("创建空间")]),t._v(" "),v("td",[v("code",[t._v("kubectl create namespace test")])]),t._v(" "),v("td",[t._v("创建一个名为 test 的空间")])]),t._v(" "),v("tr",[v("td",[t._v("删除空间")]),t._v(" "),v("td",[v("code",[t._v("kubectl delete namespaces test")])]),t._v(" "),v("td",[t._v("删除名为 test 的空间")])])])])])}),[],!1,null,null,null);e.default=d.exports}}]);