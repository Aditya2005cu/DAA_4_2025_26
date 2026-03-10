class Solution {
  public:
    vector<int> maxOfSubarrays(vector<int>& arr, int k) {
        vector<int> result;
        
        int l = 0;
        int r = k - 1;
        int mx = 0;
        int mx_index = -1;
        for(int i = l;i<=r;i++){
            if(max(arr[i],mx) == arr[i]){
                mx_index = i;
                mx = arr[i];
            }
            
        }
        result.push_back(mx);
        l++;
        r++;
        
        while(r < arr.size()){
            if(mx_index > l-1){
                if(max(mx,arr[r]) == arr[r]){
                    mx_index = r;
                    mx = arr[r];
               }
            }
            else{
                if(arr[r]>=mx){
                    mx_index = r;
                    mx = arr[r];
                }
                else if(arr[r]<mx){
                    mx = arr[l];
                    mx_index = l;
                    for(int i = l;i<=r;i++){
                        if(max(arr[i],mx) == arr[i]){
                            mx = arr[i];
                            mx_index = i;
                        }
                    }
                }
            }
            result.push_back(mx);
            l++;
            r++;
            
        }
        
        return result;
        
        
    }
};
