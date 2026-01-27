#include <iostream>
#include <vector>
#include <unordered_map>
#include <string>
using namespace std;

int check_stable_attend(vector<char> arr ){
    int n = arr.size();
    unordered_map<int,int> mp;
    mp[0] = -1;
    int maxlen = 0;
    int currsum = 0;
    for(int i = 0;i<n;i++){
        if(arr[i] == 'P') currsum += 1;
        else if(arr[i] == 'A') currsum -= 1;
        if (mp.find(currsum) != mp.end()){
            maxlen = max(maxlen , i - mp[currsum]);
            
        }
        else{
            mp[currsum] = i;
        }
    }
    return maxlen;
}
int main() {
    vector<char> attendance = {'A','A','P','P','A','A','P','P','A','P'};
    int max_stable = check_stable_attend(attendance);
    cout<<"longest stable length attendance:"<<max_stable<<endl;

    return 0;
}