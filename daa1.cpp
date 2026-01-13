#include <bits/stdc++.h>
using namespace std;


void complexRec(int n) {

#include <iostream>
#include <vector>
#include <algorithm>
#include <chrono>
#include <cmath>

using namespace std;
using namespace std::chrono;

long long total_ops = 0;
int max_depth = 0;

void complexRec(int n, int current_depth) {
    if (n <= 2) {
        max_depth = max(max_depth, current_depth);
        return;
    }

    int p = n;
    while (p > 0) {
        vector<int> temp(n);
        for (int i = 0; i < n; i++) {
            temp[i] = i ^ p;
            total_ops++; 
        }
        p >>= 1;
    }

    vector<int> small(n);
    for (int i = 0; i < n; i++) {
        small[i] = i * i;
        total_ops++; 
    }

    
    reverse(small.begin(), small.end());
    total_ops += (n / 2); 

    
    complexRec(n / 2, current_depth + 1);
    complexRec(n / 2, current_depth + 1);
    complexRec(n / 2, current_depth + 1);
}

void run_experiment(int n) {
    total_ops = 0;
    max_depth = 0;
    
    auto start = high_resolution_clock::now();
    complexRec(n, 0);
    auto stop = high_resolution_clock::now();
    
    auto duration = duration_cast<milliseconds>(stop - start);

    cout << "n: " << n 
         << " | Operations: " << total_ops 
         << " | Depth: " << max_depth 
         << " | Time: " << duration.count() << " ms" << endl;
}

int main() {
    vector<int> test_sizes = {10, 100, 500, 1000, 2000};
    
    cout << "Experiment Results:" << endl;
    
    for (int n : test_sizes) {
        run_experiment(n);
    }
    return 0;
}//  recurrence relation : T(n) = 3T(n/2) + n log(n)
}
