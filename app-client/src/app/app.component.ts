import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

const get_users = gql`
  {
    users {
      _id
      active
      firstName
      fullName
    }
  }
`;

const create_user = gql`
  mutation createUser($firstName: String!, $lastName: String!, $email: String!, $active: Boolean!) {
    createUser(data: { 
      firstName: $firstName, 
      lastName: $lastName, 
      email: $email, 
      active: $active 
    }) 
    {
      _id
      email
      fullName
    }
  }
`;

const update_user = gql`
  mutation updateUser($id: ID!, $firstName: String, $lastName: String, $email: String, $active: Boolean) {
    updateUser(id: $id, data: {
      firstName: $firstName, 
      lastName: $lastName, 
      email: $email, 
      active: $active 
    })
    {
      _id
      email
      fullName
    }
  }
`;

const delete_user = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  listUsers: any;
  private querySubscription: Subscription;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.getUsers();
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

  getUsers() {
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: get_users,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.listUsers = data.users;
      }, (err) => {
        console.log(err);
      });
  }

  createUser() {
    this.apollo
      .mutate({
        mutation: create_user,
        refetchQueries: [{ query: get_users }],
        variables: {
          firstName: 'Teste',
          lastName: '1',
          email: 'teste1@email.com',
          active: true
        }
      })
      .subscribe(({ data }) => {
        console.log(data);
      }, (error) => {
        console.log('there was an error sending the query', error);
      });
  }

  updateUser(idUser: string) {
    this.apollo
      .mutate({
        mutation: update_user,
        refetchQueries: [{ query: get_users }],
        variables: {
          id: idUser,
          firstName: 'Mudei o nome',
        }
      })
      .subscribe(({ data }) => {
        console.log(data);
      }, (error) => {
        console.log('there was an error sending the query', error);
      });
  }

  deleteUser(idUser: string) {
    this.apollo
      .mutate({
        mutation: delete_user,
        refetchQueries: [{ query: get_users }],
        variables: {
          id: idUser
        }
      })
      .subscribe(({ data }) => {
        console.log(data);
      }, (error) => {
        console.log('there was an error sending the query', error);
      });
  }
}
