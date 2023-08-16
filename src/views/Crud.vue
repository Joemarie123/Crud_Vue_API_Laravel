<template>
  <div class="data-table-container">
    <v-btn @click="dialogadddata = true" class="mt-3" color="blue">ADD DATA</v-btn>
    <v-dialog v-model="dialogadddata" max-width="400">

      <v-card>
   

<v-card>
        <v-card-title>ADD Details</v-card-title>
        <v-card-text>
          <v-text-field  variant="outlined" prepend-inner-icon="mdi-account" density="compact" v-model="name" label="Name"></v-text-field>
          <v-text-field  variant="outlined" prepend-inner-icon="mdi-account" density="compact" v-model="address" label="Address"></v-text-field>
          <v-text-field  variant="outlined" prepend-inner-icon="mdi-account" density="compact" v-model="mobile" label="Mobile"></v-text-field>
        </v-card-text>
        <v-card-actions class="mt-n5">
          <v-btn color="primary"  @click="register()">Save</v-btn>
          <v-btn  @click="dialogadddata = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
  </v-card>

  <div>
     
  </div>
    </v-dialog> 

    <table class="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Address</th>
          <th>Mobile</th>
          <th>ACTIONS</th>
        </tr>
      </thead>
      <tbody>
       <!--  <tr v-for="user in users" :key="user.id"> -->
          <tr v-for="(user, index) in users" :key="user.id">

          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.address }}</td>
          <td>{{ user.mobile }}</td>
          
          <td class="center">
             <!--  <v-btn class="mx-2" color="red"  @click="redirecttoHomeEventsViewList(row)"> -->
      <v-btn color="green" @click="editItem(index)">EDIT</v-btn>

       <v-dialog v-model="showEditForm" max-width="400">
      <v-card>
        <v-card-title>Edit Details</v-card-title>
        <v-card-text>
        <!--   <v-text-field prepend-inner-icon="mdi-account" density="compact" variant="outlined" v-model="editedItem.id" label="Name"></v-text-field> -->
          <v-text-field prepend-inner-icon="mdi-account" density="compact" variant="outlined" v-model="editedItem.name" label="Name"></v-text-field>
          <v-text-field prepend-inner-icon="mdi-account" density="compact" variant="outlined" v-model="editedItem.address" label="Address"></v-text-field>
          <v-text-field  prepend-inner-icon="mdi-account" density="compact" variant="outlined" v-model="editedItem.mobile" label="Mobile"></v-text-field>
        </v-card-text>
        <v-card-actions class="ml-3 mt-n5">
          <v-btn color="primary" @click="updateItem()">Update</v-btn>
          <v-btn @click="cancelEdit">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


                  <v-btn color="red" @click="createProduct(user.id)" class="mx-2">Delete</v-btn>
                  

      <v-dialog v-model="dialogVisible" max-width="400">
    <v-card >
      <v-card-title class="headline">Confirm Action</v-card-title>
      <v-card-text>Are you sure you want to delete the item and fetch users?</v-card-text>
      <v-card-actions>
        <v-btn color="red" text @click="cancelAction">No</v-btn>
        <v-btn color="green" text @click="executeAction">Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>


            </td>
        </tr>
      </tbody>
    </table>
  </div>




</template>

<style>
.data-table-container {
  max-width: 600px;
  margin: 0 auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.data-table th,
.data-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

.data-table th {
  background-color: #f0f0f0;
  font-weight: bold;
}

.data-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.data-table tbody tr:hover {
  background-color: #e6e6e6;
  cursor: pointer;
}
</style>


<script>

import { mapActions, mapGetters } from 'vuex';
import axios from 'axios';

export default {
  name: 'HomePage',
data() {
  
  return {
    showEditForm: false,
    dialogadddata:false,
    editedItem: {
        id: null,
        name: '',
        address: '',
        mobile: '',
      },
      
    dialogVisible: false,
      grade_id: null,
      name:'',
      address:'',
      mobile:'',
      rows: [],
  };
},
mounted() {
 /*  this.startCountdown(); */
},


computed: {
  ...mapGetters('users', {users: 'getUsers'
  }),
},


/*   created() {
  this.fetchUsers().then(() => {
      this.populateRows();
  }); 
*/

/*     CODE FOR V-DATA-TABLE */
  created() {
  this.fetchUsers().then(() => {
      this.populateRows();
    this.users.forEach(user => {
      this.rows.push({
        id : user.id,
        name: user.name,
        address: user.address,
        mobile: user.mobile,
       
      });
      console.log("List users",this.rows)
    })
  });


},

methods: {

    ...mapActions('users', ['fetchUsers']),
    ...mapActions('users', ['registration']),
    ...mapActions('users', [ 'deleteItem']),
    ...mapActions('users', [ 'updateUser']),

    editItem(index) {
      this.editedItem = { ...this.users[index] };
      this.showEditForm = true;
    },
    cancelEdit() {
      this.showEditForm = false;
    },

    populateRows() {
    this.rows = this.users.map((user) => ({
      id: user.id,
      name: user.name,
      address: user.address,
      mobile: user.mobile,
    }));
  },

  async handleUpdateItem() {
    await this.$store.dispatch('updateItem');
  },

  async updateItem() {
    try {
        const { id, name, address, mobile } = this.editedItem;
        
        await this.updateUser({
          id,
          name,
          address,
          mobile,
        });
      } catch (error) {
        console.error('Error updating item:', error);
      }
      this.fetchUsers();
      this.showEditForm = false;
  },



    //// CODE FOR DELETE
  cancelAction() {
    this.dialogVisible = false;
  },

  async createProduct(id) {
           this.idToDelete = id;
          this.dialogVisible = true;
  },
  async executeAction() {
    this.dialogVisible = false;
    await this.deleteItem(this.idToDelete);
    await this.fetchUsers();
  },
     //// END CODE FOR DELETE

     
    edit(user)
    {
      this.user = user;
    },


  register() {
    console.log("register");

    let data = new FormData();
    data.append('name', this.name);
    data.append('address', this.address);
    data.append('mobile', this.mobile);
    
    this.registration(data).then(() => {
        this.navigateTo('/walup');
      }).catch(e => console.log(e.message));
      this.name = '';
           this.address = '';
        this.mobile = '';
      this.fetchUsers()  
      this.dialogadddata = false
  },

  navigateTo(path) {
    this.$router.push({ 'path': path });
  },



},
};

</script>