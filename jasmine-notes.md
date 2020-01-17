# React Homework feedback

- Weird character on line 29 `src/petdata.js`
- Clarify that the pet’s adopted status is changing on local state only
- Is it important that the adopt button toggles back (ie, more than just one click)? If so, need tests for that
- Students may have difficulty with the filtering being synced up with the select onChange
- Tier 3 test 2 failed when I passed test 3. I fixed this for my own code by removing conditional to showing `<PetList />` component
- Tier 4 test file line 21 - refers to `DeleteButton` component where it is now `DeletePet`
- Tier 4 test file instructions have crucial information but might be missed if students go immediately to look at test specs
- I was able to complete Tier 4 functionally but was not able to pass two of the tests (#2, #3) when the `DeletePet` component was more than a simple `<button></button>` (i.e., I wrapped it in a div and the tests wouldn’t pass)
- Other overall comments -
  _ Instructions are mostly clear
  _ Some gotchas - having the loading/error messages display appropriately to pass tests may be difficult for students
