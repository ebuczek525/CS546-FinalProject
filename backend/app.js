const bcrypt = require('bcrypt')

const rounds = 1024     //default amount of rounds
const password = ''

//creates hash for password
bcrypt.hash(password, rounds, function(err, hash) => {
  if(err){
    console.error(err)
    return
  }
  console.log(hash)

 /*
 let hash=bcrypt.hashSync(password, rounds);
 */

  //compares password and hash to allow for user login
  bcrypt.compare(password, hash, (err, res) => {
    if(err){                    //passwords don't match
      console.error(err)
      return
    }
    console.log(res)            //passwords do match
  })

  /*
  if(bcrypt.compareSync(password, hash)){
    console.log(res)
  }
  else{
    console.error(err)
  }
*/

})

const hashPassword = async () => {
  const hash = await bcrypt.hash(password, rounds)
  console.log(hash)
  console.log(await bcrypt.compare(password, hash))
}

hashPassword()
