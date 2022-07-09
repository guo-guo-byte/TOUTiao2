// 获取数据

export function getLocal(key) {
  let data = localStorage.getItem(key);
  // 检测是否时对像形式 不是直接打印 然后在返回原来的数据
  try {
    data = JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
  return data;
}
// 存储数据
export function setLocal(key, value) {
  // 检测是否时字符串形式  是直接存储不是源数据返回
  localStorage.setItem(
    key,
    typeof value === "object" ? JSON.stringify(value) : value
  );
}
