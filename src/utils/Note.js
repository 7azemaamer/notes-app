import axios from 'axios';
import Swal from 'sweetalert2'
// Add Note

export function showAddNote({token , update}){
    Swal.fire({
        title: 'Add New Note',
        html:`
        <input type="text" id="title" name="title" placeholder="Enter A Title" class="form-control"/>
        <textarea type="text" id="content" name="content" placeholder="Enter A Describtion" class="form-control mt-3"></textarea>
        `,
        showCancelButton: true,
        confirmButtonText: 'Add',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          const title = document.getElementById("title").value;
          const content = document.getElementById("content").value;
            return {title , content};
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if(result.isConfirmed){
            sendNoteToApi({title:result.value.title, content:result.value.content, token , update})
        }
      })
}
//Send Note To Api 
async function sendNoteToApi({title, content, token ,update}){
    const {data} = await axios.post(`https://note-sigma-black.vercel.app/api/v1/notes`,{title, content}, {headers:{token}});
    
    
    if(data.msg === 'done'){
        getNotes({token , update});
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your note has been added',
            showConfirmButton: false,
            timer: 1500
          })
    }
}

//Show Note In The Website

export async function getNotes({token , update}){
    try{
        const {data} = await axios.get(`https://note-sigma-black.vercel.app/api/v1/notes`, {headers:{token}});
        update(data.notes);
    }catch(error){
        update([])
    }   

}

// Delete Note 
export function showDelete({noteId , token, update }){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            sendDeletedNote({noteId , token, update });
        }
      })
}

async function sendDeletedNote({noteId , token, update }){
    const {data} = await axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${noteId}` , {headers:{token}});
    getNotes({token , update});
    Swal.fire('Deleted!','Your note has been deleted.','success')
}

// Update Notes

export function showUpdate({prevTitle , prevContent , noteId , token , update}){
    Swal.fire({
        title: 'Update New Note',
        html:`
        <input value="${prevTitle}" type="text" id="title" name="title" placeholder="Enter A Title" class="form-control"/>
        <textarea type="text" id="content" name="content" placeholder="Enter A Describtion" class="form-control mt-3">${prevContent}</textarea>
        `,
        showCancelButton: true,
        confirmButtonText: 'Update',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          const title = document.getElementById("title").value;
          const content = document.getElementById("content").value;
            return {title , content};
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if(result.isConfirmed){
            sendUpdatedData({noteId , token , update , title:result.value.title  , content:result.value.content });
        }
      })
}
async function sendUpdatedData({ noteId, token, update, title, content }) {
    const { data } = await axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`, { title, content }, { headers: { token } });
    getNotes({ token, update });
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your note has been updated',
        showConfirmButton: false,
        timer: 1500
    });
}
