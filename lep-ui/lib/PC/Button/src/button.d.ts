/*
 * @Author: your name
 * @Date: 2021-07-15 23:53:14
 * @LastEditTime: 2021-07-16 00:00:18
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \lep-ui\lib\PC\Button\src\button.d.ts
 */
import { ISzie } from "lib/PC/types/types";

/**
* @desc: button 类型定制
* @author:  zyj
* @creatDate 2021-07-15 20:37:03
* @param {*}  val
*/
export interface IPropsButton {
  name?: string;
  loading?: boolean;
  className?: string;
  size?: ISzie
}
