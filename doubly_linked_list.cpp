#include <bits/stdc++.h>
#include <iostream>
using namespace std;
// doubly linked list code:-
struct node{
    node* previous;
    node* next;
    int data;
    node(int d = 0, node* n = nullptr, node* p = nullptr): data(d), next(n), previous(p){}
    
};

void insert(node* &head,int value,int index){
    if(head == nullptr){
        head = new node(value);
        
    }
    else if(index == 0){
        node* newnode = new node(value,head,nullptr);
        head->previous = newnode;
        head = newnode;
    }
    else{
        node* temp = head;
        int c = 1;
        //traversing to previous index
        while(c < index && temp->next != nullptr){
            temp = temp->next;
            c++;
        }
        if(temp->next != nullptr){
            node* newnode = new node(value,temp->next,temp);
            temp->next = newnode;
            newnode->next->previous = newnode;
        }
        else{
            node* newnode = new node(value,nullptr,temp);
            temp->next = newnode;
        }
    }
}

void delete_index(node* &head, int index){
    if(head == nullptr){
        return;
    }
    else if(index == 0){
        node* curr = head;
        head = head->next;
        head->previous = nullptr;
        delete curr;
    }
    else{
        node* temp = head;
        int c = 1;
        //traversing to previous index
        while(c < index && temp->next != nullptr){
            temp = temp->next;
            c++;
        }
        if(temp->next != nullptr){
            node* curr = temp->next;
            temp->next = curr->next;
            curr->next->previous = temp;
            delete curr;
        }
        else{
            temp->previous->next = nullptr;
            delete temp;
        }
    }
}
void display(node* head){
    if(head == nullptr){
        cout<<"NULL"<<endl;
        return;
    }
    node* temp = head;
    cout<<"start->";
    while(temp != nullptr){
        cout<<temp->data<<"-> ";
        temp = temp->next;
    }
    cout<<"end"<<endl;
}

int main() {
    node* head = nullptr;
    for(int i = 1; i<21; i++){
        insert(head,i*10,i-1);
    }
    display(head);
    insert(head,69,0);
    display(head);
    delete_index(head,0);
    delete_index(head,30);
    delete_index(head,10);
    display(head);
   
    return 0;
}