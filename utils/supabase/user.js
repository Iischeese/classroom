const { createClient } = require("./server");

const supabase = createClient()

const user = await supabase.auth.getUser()

let { data, error } = await supabase
  .from('users')
  .select()
  .eq('user_id', await user.data.user.id)
  .single()

export {user, data} 