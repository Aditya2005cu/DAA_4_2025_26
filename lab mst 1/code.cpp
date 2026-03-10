class Solution {
  public:
    vector<int> maxOfSubarrays(vector<int>& arr, int k) {
        vector<int> result;
        
        int l =0;
        int r = k - 1;
        
        while(r<arr.size()){
            int mx = 0;
            
            for(int i = l;i<=r;i++){
                mx = max(arr[i],mx);
            }
            result.push_back(mx);
            
            l++;
            r++;
        }
         
        return result;
        
        
    }
};
