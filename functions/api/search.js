export async function onRequest({ request, env }) {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({success:false,message:"仅支持POST请求"}), {
      headers: { "Content-Type": "application/json" },
      status: 405
    })
  }

  try {
    const { subject, name, idcard } = await request.json();
    if (!subject || !name || !idcard) {
      return new Response(JSON.stringify({success:false,message:"请填写完整信息"}), {
        headers: { "Content-Type": "application/json" }
      })
    }

    // 查询条件：科目 + 姓名 + (身份证号 或 准考证号)
    const { results } = await env.neea_score.prepare(
      `SELECT * FROM scores WHERE subject = ? AND uname = ? AND (idCardl = ? OR writtenExamNum = ?) LIMIT 1`
    ).bind(subject, name, idcard, idcard).run();

    if (!results.length) {
      return new Response(JSON.stringify({success:false,message:"考生信息有误，请重新输入"}), {
        headers: { "Content-Type": "application/json" }
      })
    }

    return new Response(JSON.stringify({
      success:true,
      data: results[0]
    }), {
      headers: { "Content-Type": "application/json" }
    })

  } catch(err){
    console.error('数据库查询异常：', err)
    return new Response(JSON.stringify({success:false,message:"服务器异常"}), {
      headers: { "Content-Type": "application/json" },
      status: 500
    })
  }
}
