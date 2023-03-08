#include <bits/stdc++.h>
#define ll long long
#define ld long double
using namespace std;
clock_t startTime;
double getCurrentTime()
{
    return (double)(clock() - startTime) / CLOCKS_PER_SEC;
}
//------------------------------------------------IO_OPERATORS---------------------------------------------/
template <typename T, typename U>
inline ostream &operator<<(ostream &_out, const pair<T, U> &_p)
{
    _out << _p.first << " " << _p.second;
    return _out;
}
template <typename T, typename U>
inline istream &operator>>(istream &_in, pair<T, U> &_p)
{
    _in >> _p.first >> _p.second;
    return _in;
}
template <typename T>
inline ostream &operator<<(ostream &_out, const vector<T> &_v)
{
    if (_v.empty())
        return _out;
    _out << _v.front();
    for (auto _it = ++_v.begin(); _it != _v.end(); ++_it)
        _out << ' ' << *_it;
    return _out;
}
template <typename T>
inline istream &operator>>(istream &_in, vector<T> &_v)
{
    for (auto &_i : _v)
        _in >> _i;
    return _in;
}
template <typename T>
inline ostream &operator<<(ostream &_out, const set<T> &_s)
{
    if (_s.empty())
        return _out;
    _out << *_s.begin();
    for (auto _it = ++_s.begin(); _it != _s.end(); ++_it)
        _out << ' ' << *_it;
    return _out;
}
template <typename T>
inline ostream &operator<<(ostream &_out, const multiset<T> &_s)
{
    if (_s.empty())
        return _out;
    _out << *_s.begin();
    for (auto _it = ++_s.begin(); _it != _s.end(); ++_it)
        _out << ' ' << *_it;
    return _out;
}
template <typename T>
inline ostream &operator<<(ostream &_out, const unordered_set<T> &_s)
{
    if (_s.empty())
        return _out;
    _out << *_s.begin();
    for (auto _it = ++_s.begin(); _it != _s.end(); ++_it)
        _out << ' ' << *_it;
    return _out;
}
template <typename T>
inline ostream &operator<<(ostream &_out, const unordered_multiset<T> &_s)
{
    if (_s.empty())
        return _out;
    _out << *_s.begin();
    for (auto _it = ++_s.begin(); _it != _s.end(); ++_it)
        _out << ' ' << *_it;
    return _out;
}
template <typename T, typename U>
inline ostream &operator<<(ostream &_out, const map<T, U> &_m)
{
    if (_m.empty())
        return _out;
    _out << "{\"" << _m.begin()->first << "\", \"" << _m.begin()->second << "\"}";
    for (auto _it = ++_m.begin(); _it != _m.end(); ++_it)
        _out << ", { \"" << _it->first << "\", \"" << _it->second << "\"}";
    return _out;
}
template <typename T, typename U>
inline ostream &operator<<(ostream &_out, const unordered_map<T, U> &_m)
{
    if (_m.empty())
        return _out;
    _out << '(' << _m.begin()->first << ": " << _m.begin()->second << ')';
    for (auto _it = ++_m.begin(); _it != _m.end(); ++_it)
        _out << ", (" << _it->first << ": " << _it->second << ')';
    return _out;
}
// For 1 based indexing
template <typename T>
void out(const vector<T> &a, int n)
{
    for (int i = 1; i <= n; ++i)
    {
        // //cout << a[i] << ' ';
    }
    // //cout << "\n";
}
template <typename T>
void out(const vector<vector<T>> &a, int n, int m)
{
    for (int i = 1; i <= n; ++i)
    {
        for (int j = 1; j <= m; ++j)
        {
            // //cout << a[i][j] << ' ';
        }
        // //cout << '\n';
    }
}




const int MAX = 46800;  // Reach hub before this time
const int limit_on_package_volume = 100;
const int limit_on_delivery_distances = 10000;
#define MINIMUM_POINTS 1    // minimum number of points in a cluster
#define EPSILON (100)  // distance for clustering, metre^2



pair<int, int> calculateCost(vector<vector<int>> &adjancy_matrix, int numRiders, vector<int> &endOfDelivery, vector<int> bagSize, vector<int> &package_volume, int reach_hub_before_this_time, vector<int> &order_of_delivery)
{
    int max_package_volume = 1e9;
    int total_successful_delivery = 0, total_dist = 0;

    vector<vector<int>> ans(numRiders);
    int numLocations = adjancy_matrix.size() - 1;

    int current_location = 0;

    vector<bool> is_delivered(numLocations + 1, false);
    is_delivered[0] = true;
    vector<int> temp_bag_size = bagSize;
    for (int i = 0; i < numRiders; i++)
    {
        int total_time = 0;
        current_location = 0;

        for (int j = 1; j <= numLocations; j++)
        {
            if (is_delivered[order_of_delivery[j]])
                continue;

            if (temp_bag_size[i] <= max_package_volume and temp_bag_size[i] >= package_volume[order_of_delivery[j]] and adjancy_matrix[order_of_delivery[current_location]][order_of_delivery[j]] + total_time <= endOfDelivery[order_of_delivery[j]] and adjancy_matrix[order_of_delivery[current_location]][order_of_delivery[j]] + total_time + adjancy_matrix[order_of_delivery[current_location]][0] <= reach_hub_before_this_time)
            {

                total_successful_delivery++;
                total_time += adjancy_matrix[order_of_delivery[current_location]][order_of_delivery[j]];
                temp_bag_size[i] -= package_volume[order_of_delivery[j]];
                is_delivered[order_of_delivery[j]] = true;
                current_location = j;
            }
        }
        total_dist += (total_time + adjancy_matrix[current_location][0]);
    }

    return {total_successful_delivery, total_dist};
}



// pair<int, int> calculateCost_mayank(vector<vector<int>> &adjancy_matrix, int numRiders, vector<int> &endOfDelivery, vector<int> bagSize, vector<int> &package_volume, int reach_hub_before_this_time, vector<int> &order_of_delivery)
// {
//     vector<pair<int, int>> sorted_endOfDelivery;
//     for (int i = 1; i < order_of_delivery.size(); i++)
//     {
//         sorted_endOfDelivery.push_back({endOfDelivery[order_of_delivery[i]], order_of_delivery[i]});
//     }
//     // sort(sorted_endOfDelivery.begin(), sorted_endOfDelivery.end());

//     vector<vector<int>> ans_riderMatrix(numRiders);
//     vector<int> riders_traveintedDistance(numRiders, 0);
//     vector<int> riders_bagCapacity(numRiders, 0);
//     vector<int> riders_currentLocation(numRiders, 0);
//     for (auto x : sorted_endOfDelivery)
//     {
//         vector<pair<int, int>> feasibleRiders;
//         for (int i = 0; i < numRiders; i++)
//         {
//             if ((riders_traveintedDistance[i] + adjancy_matrix[riders_currentLocation[i]][x.second]) <= x.first && (riders_bagCapacity[i] + package_volume[x.second]) <= bagSize[i])
//             {
//                 // if (adjancy_matrix[riders_currentLocation[i]][x.second] <= max_gap_between_points)
//                 // {
//                     if ((riders_traveintedDistance[i] + adjancy_matrix[riders_currentLocation[i]][x.second] + adjancy_matrix[x.second][0]) <= reach_hub_before_this_time)
//                     {
//                         feasibleRiders.push_back({riders_traveintedDistance[i] + adjancy_matrix[riders_currentLocation[i]][x.second], i});
//                     }
//                 // }
//             }
//         }
//         sort(feasibleRiders.begin(), feasibleRiders.end());
//         if (feasibleRiders.size() > 0)
//         {
//             int rider = feasibleRiders[0].second;
//             ans_riderMatrix[rider].push_back(x.second);
//             riders_traveintedDistance[rider] = feasibleRiders[0].first;
//             riders_bagCapacity[rider] += package_volume[x.second];
//             riders_currentLocation[rider] = x.second;
//         }
//     }


//     // return ans_riderMatrix;

//     int total_successful_delivery=0;
//     int total_dist = 0;
//     for(int i=0;i<numRiders;i++)
//     {
//         total_successful_delivery += ans_riderMatrix[i].size();
//         if(ans_riderMatrix[i].size()==0)
//         {
//             continue;
//         }
//         for(int j=1;j<ans_riderMatrix[i].size();j++)
//         {
//             total_dist += adjancy_matrix[ans_riderMatrix[i][j-1]][ans_riderMatrix[i][j]];
//         }
//         total_dist += adjancy_matrix[0][ans_riderMatrix[i][0]];
//         total_dist += adjancy_matrix[ans_riderMatrix[i].back()][0];
//     }


//     return {total_successful_delivery, total_dist};
// }




// vector<vector<int>> final_order_mayank(vector<vector<int>> &adjancy_matrix, int numRiders, vector<int> &endOfDelivery, vector<int> bagSize, vector<int> &package_volume, int reach_hub_before_this_time, vector<int> &order_of_delivery)
// {
//     vector<pair<int, int>> sorted_endOfDelivery;
//     for (int i = 1; i < order_of_delivery.size(); i++)
//     {
//         sorted_endOfDelivery.push_back({endOfDelivery[order_of_delivery[i]], order_of_delivery[i]});
//     }
//     // sort(sorted_endOfDelivery.begin(), sorted_endOfDelivery.end());

//     vector<vector<int>> ans_riderMatrix(numRiders);
//     vector<int> riders_traveintedDistance(numRiders, 0);
//     vector<int> riders_bagCapacity(numRiders, 0);
//     vector<int> riders_currentLocation(numRiders, 0);
//     for (auto x : sorted_endOfDelivery)
//     {
//         vector<pair<int, int>> feasibleRiders;
//         for (int i = 0; i < numRiders; i++)
//         {
//             if ((riders_traveintedDistance[i] + adjancy_matrix[riders_currentLocation[i]][x.second]) <= x.first && (riders_bagCapacity[i] + package_volume[x.second]) <= bagSize[i])
//             {
//                 // if (adjancy_matrix[riders_currentLocation[i]][x.second] <= max_gap_between_points)
//                 // {
//                     if ((riders_traveintedDistance[i] + adjancy_matrix[riders_currentLocation[i]][x.second] + adjancy_matrix[x.second][0]) <= reach_hub_before_this_time)
//                     {
//                         feasibleRiders.push_back({riders_traveintedDistance[i] + adjancy_matrix[riders_currentLocation[i]][x.second], i});
//                     }
//                 // }
//             }
//         }
//         sort(feasibleRiders.begin(), feasibleRiders.end());
//         if (feasibleRiders.size() > 0)
//         {
//             int rider = feasibleRiders[0].second;
//             ans_riderMatrix[rider].push_back(x.second);
//             riders_traveintedDistance[rider] = feasibleRiders[0].first;
//             riders_bagCapacity[rider] += package_volume[x.second];
//             riders_currentLocation[rider] = x.second;
//         }
//     }


//     return ans_riderMatrix;
// }


vector<vector<int>> delivering_based_on_End_of_Delivery_Time211(int max_gap_between_points, int max_package_volume, vector<vector<int>> &adjancy_matrix,
                                                              int numRiders, vector<int> &endOfDelivery, vector<int> &bagSize, vector<int> &package_volume,
                                                              int reach_hub_before_this_time, vector<int> &order_of_delivery)
{
    // adjancy_matrix - 1-index // 0-th is the hub
    // package_volume - 1-index
    // endOfDelivery - 1-index
    // vector<pair<int, int>> sorted_endOfDelivery;
    // for (int i = 1; i < endOfDelivery.size(); i++)
    // {
    //     sorted_endOfDelivery.push_back({endOfDelivery[i], i});
    // }
    // sort(sorted_endOfDelivery.begin(), sorted_endOfDelivery.end());

    vector<pair<int, int>> sorted_endOfDelivery;
    for (int i = 1; i < order_of_delivery.size(); i++)
    {
        sorted_endOfDelivery.push_back({endOfDelivery[order_of_delivery[i]], order_of_delivery[i]});
    }

    vector<vector<int>> ans_riderMatrix(numRiders);
    vector<int> riders_traveintedDistance(numRiders, 0);
    vector<int> riders_bagCapacity(numRiders, 0);
    vector<int> riders_currentLocation(numRiders, 0);
    for (auto x : sorted_endOfDelivery)
    {
        vector<pair<int, int>> feasibleRiders;
        for (int i = 0; i < numRiders; i++)
        {
            if ((riders_traveintedDistance[i] + adjancy_matrix[riders_currentLocation[i]][x.second]) <= x.first && (riders_bagCapacity[i] + package_volume[x.second]) <= bagSize[i])
            {
                if (adjancy_matrix[riders_currentLocation[i]][x.second] <= max_gap_between_points)
                {
                    if (package_volume[x.second] <= max_package_volume)
                    {
                        if ((riders_traveintedDistance[i] + adjancy_matrix[riders_currentLocation[i]][x.second] + adjancy_matrix[x.second][0]) <= reach_hub_before_this_time)
                        {
                            feasibleRiders.push_back({riders_traveintedDistance[i] + adjancy_matrix[riders_currentLocation[i]][x.second], i});
                        }
                    }
                }
            }
        }
        sort(feasibleRiders.begin(), feasibleRiders.end());
        if (feasibleRiders.size() > 0)
        {
            int rider = feasibleRiders[0].second;
            ans_riderMatrix[rider].push_back(x.second);
            riders_traveintedDistance[rider] = feasibleRiders[0].first;
            riders_bagCapacity[rider] += package_volume[x.second];
            riders_currentLocation[rider] = x.second;
            // }
            // int rider=feasibleRiders[0].second;
            //     ans_riderMatrix[rider].push_back(x.second);
            //     riders_traveintedDistance[rider]=feasibleRiders[0].first;
            //     riders_bagCapacity[rider]+=package_volume[x.second];
            //     riders_currentLocation[rider]=x.second;
        }
    }

    return ans_riderMatrix;
}

// To minimize the distance we should send all the possiblities that have same accuracy but this one is sending only one of them
// so return all of them to get the minimum distance
// Mayank Code
vector<vector<int>> final_order_mayank(vector<vector<int>> &adjancy_matrix, int numRiders, vector<int> &endOfDelivery, vector<int> bagSize, vector<int> &package_volume, int reach_hub_before_this_time, vector<int> &order_of_delivery)
{
    vector<vector<int>> riderOrder;
    vector<vector<vector<int>>> ans;
    for (int x = (limit_on_delivery_distances/10); x <= limit_on_delivery_distances; x += (limit_on_delivery_distances/10))
    {
        for (int y = (limit_on_package_volume/10); y <= limit_on_package_volume; y+=(limit_on_package_volume/10))
        {
            riderOrder = delivering_based_on_End_of_Delivery_Time211(x, y, adjancy_matrix, numRiders, endOfDelivery, bagSize, package_volume, reach_hub_before_this_time, order_of_delivery);
            ans.push_back(riderOrder);
        }
        riderOrder = delivering_based_on_End_of_Delivery_Time211(x, limit_on_package_volume, adjancy_matrix, numRiders, endOfDelivery, bagSize, package_volume, reach_hub_before_this_time, order_of_delivery);
        ans.push_back(riderOrder);
    }

    for (int y = (limit_on_package_volume/10); y <= limit_on_package_volume; y+=(limit_on_package_volume/10))
    {
        riderOrder = delivering_based_on_End_of_Delivery_Time211(limit_on_delivery_distances, y, adjancy_matrix, numRiders, endOfDelivery, bagSize, package_volume, reach_hub_before_this_time, order_of_delivery);
        ans.push_back(riderOrder);
    }
    riderOrder = delivering_based_on_End_of_Delivery_Time211(limit_on_delivery_distances, limit_on_package_volume, adjancy_matrix, numRiders, endOfDelivery, bagSize, package_volume, reach_hub_before_this_time, order_of_delivery);
    ans.push_back(riderOrder);

    vector<vector<int>> ans1(numRiders);
    vector<vector<vector<int>>> real_ans;
    int ans_count = 0;
    for (auto x : ans)
    {
        int count = 0;
        for (int i = 0; i < numRiders; i++)
        {
            for (auto y : x[i])
            {
                if (y != 0)
                    count++;
            }
        }
        if (count > ans_count)
        {
            ans1 = x;
            ans_count = count;
        }
    }

    for (auto x : ans)
    {
        int count = 0;
        for (int i = 0; i < numRiders; i++)
        {
            for (auto y : x[i])
            {
                if (y != 0)
                    count++;
            }
        }
        if (count == ans_count)
        {
            real_ans.push_back(x);
        }
    }

    // return real_ans;
    return ans1;
}


pair<int,int> calculateCost_mayank(vector<vector<int>> &adjancy_matrix, int numRiders, vector<int> &endOfDelivery, vector<int> bagSize, vector<int> &package_volume, int reach_hub_before_this_time, vector<int> &order_of_delivery)
{
    vector<vector<vector<int>>> ans;
    vector<vector<int>> riderOrder;
    for (int x = (limit_on_delivery_distances/10); x <= limit_on_delivery_distances; x += (limit_on_delivery_distances/10))
    {
        for (int y = (limit_on_package_volume/10); y <= limit_on_package_volume; y+=(limit_on_package_volume/10))
        {
            riderOrder = delivering_based_on_End_of_Delivery_Time211(x, y, adjancy_matrix, numRiders, endOfDelivery, bagSize, package_volume, reach_hub_before_this_time, order_of_delivery);
            ans.push_back(riderOrder);
        }
        riderOrder = delivering_based_on_End_of_Delivery_Time211(x, limit_on_package_volume, adjancy_matrix, numRiders, endOfDelivery, bagSize, package_volume, reach_hub_before_this_time, order_of_delivery);
        ans.push_back(riderOrder);
    }

    for (int y = (limit_on_package_volume/10); y <= limit_on_package_volume; y+=(limit_on_package_volume/10))
    {
        riderOrder = delivering_based_on_End_of_Delivery_Time211(limit_on_delivery_distances, y, adjancy_matrix, numRiders, endOfDelivery, bagSize, package_volume, reach_hub_before_this_time, order_of_delivery);
        ans.push_back(riderOrder);
    }
    riderOrder = delivering_based_on_End_of_Delivery_Time211(limit_on_delivery_distances, limit_on_package_volume, adjancy_matrix, numRiders, endOfDelivery, bagSize, package_volume, reach_hub_before_this_time, order_of_delivery);
    ans.push_back(riderOrder);

    vector<vector<int>> ans1(numRiders);
    vector<vector<vector<int>>> real_ans;
    int ans_count = 0;
    for (auto x : ans)
    {
        int count = 0;
        for (int i = 0; i < numRiders; i++)
        {
            for (auto y : x[i])
            {
                if (y != 0)
                    count++;
            }
        }
        if (count > ans_count)
        {
            ans1 = x;
            ans_count = count;
        }
    }

    for (auto x : ans)
    {
        int count = 0;
        for (int i = 0; i < numRiders; i++)
        {
            for (auto y : x[i])
            {
                if (y != 0)
                    count++;
            }
        }
        if (count == ans_count)
        {
            real_ans.push_back(x);
        }
    }

    // return real_ans;
    // return ans1;

     int total_successful_delivery=0;
    int total_dist = 0;
    for(int i=0;i<numRiders;i++)
    {
        total_successful_delivery += ans1[i].size();
        if(ans1[i].size()==0)
        {
            continue;
        }
        for(int j=1;j<ans1[i].size();j++)
        {
            total_dist += adjancy_matrix[ans1[i][j-1]][ans1[i][j]];
        }
        total_dist += adjancy_matrix[0][ans1[i][0]];
        total_dist += adjancy_matrix[ans1[i].back()][0];
    }


    return {total_successful_delivery, total_dist};
}

vector<int> initial_delivering_object_nearest(vector<vector<int>>&adjancy_matrix){
    int numLocations = adjancy_matrix.size() - 1;
    vector<bool> vis(numLocations + 1, false);
    vector<int> order_of_delivery;
    int current_location = 0;
    order_of_delivery.push_back(0);
    vis[0] = true;

    for (int i = 1; i <= numLocations; i++)
    {
        int nearest_location = -1, nearest_loc_value = 1e9;
        for (int j = 1; j <= numLocations; j++)
        {
            if (vis[j])
                continue;
            if (nearest_loc_value > adjancy_matrix[current_location][j])
            {
                nearest_loc_value = adjancy_matrix[current_location][j];
                nearest_location = j;
            }
        }
        vis[nearest_location] = true;
        order_of_delivery.push_back(nearest_location);
        current_location = nearest_location;
    }
    return order_of_delivery;

}


vector<int> initial_delivering_based_on_End_of_Delivery_Time__Mainfunction(vector<int> &endOfDelivery)
{
    vector<int>init_v;
    vector<pair<int, int>> sorted_endOfDelivery;
    for (int i = 1; i < endOfDelivery.size(); i++)
    {
        sorted_endOfDelivery.push_back({endOfDelivery[i], i});
    }
    sort(sorted_endOfDelivery.begin(), sorted_endOfDelivery.end());
    for(auto x11:sorted_endOfDelivery)
    {
        init_v.push_back(x11.second);
    }
    return init_v;
}


void initialize(set<pair<pair<int, int>, vector<int>>> &st,int &generations,vector<vector<int>> &adjancy_matrix,int &numRiders,vector<int>&endOfDelivery,vector<int>&bagSize,vector<int>&package_volume,int reach_hub_before_this_time){
    vector<vector<int>>init_vec;
    int numLocations = endOfDelivery.size()-1;

    vector<int>init_v=initial_delivering_based_on_End_of_Delivery_Time__Mainfunction(endOfDelivery);
    init_vec.push_back(init_v);    

    init_v=initial_delivering_object_nearest(adjancy_matrix);
    // init_vec.push_back(init_v);



    for(int j=0;j<init_vec.size();j++){
        vector<int>order_of_delivery;
        if(init_vec[j].front()!=0){
            order_of_delivery.push_back(0);
        }
        for(auto &k:init_vec[j]){
            order_of_delivery.push_back(k);
        }

        for (int i = 0; i < generations; i++)
        {


                // pair<int, int>P = calculateCost(adjancy_matrix, numRiders, endOfDelivery, bagSize, package_volume, reach_hub_before_this_time, order_of_delivery);
                pair<int,int>P=calculateCost_mayank(adjancy_matrix, numRiders, endOfDelivery, bagSize, package_volume, reach_hub_before_this_time, order_of_delivery);
                // if(P.first<P2.first or (P.first==P2.first and P.second>P2.second)){
                //     P=P2;
                // }



                st.insert({{-P.first, P.second}, order_of_delivery});
                random_shuffle(order_of_delivery.begin() + 1, order_of_delivery.begin() + (rand() % (numLocations) + 1));
        }


    }
    

}



vector<vector<int>> crossover(vector<int> &par1, vector<int> &par2)
{

    int numLocations = par1.size();
    vector<int> child1, child2;

    int point1 = rand() % (numLocations - 1) + 1;
    int point2 = rand() % (numLocations - point1) + point1;
    if (point1 == point2)
    {
        if (point1 - 1 > 1)
        {
            point1--;
        }
        else if (point2 + 1 < numLocations)
        {
            point2++;
        }
        else
        {

            int decider = rand() % 20 + 1;
            if (decider <= 10)
                point1--;
            else
                point2++;
        }
    }
    vector<bool> genes1(numLocations, false), genes2(numLocations, false);
    for (int i = 0; i < point1; i++)
    {
        child1.push_back(par1[i]);
        child2.push_back(par2[i]);
        genes1[par1[i]] = true;
        genes2[par2[i]] = true;
    }
    for (int i = point2 + 1; i < numLocations; i++)
    {
        genes1[par1[i]] = true;
        genes2[par2[i]] = true;
    }

    int ind2 = numLocations - 1, ind1 = numLocations - 1;
    for (int i = point2; i >= point1; i--)
    {
        if (!genes1[par2[i]])
        {
            child1.push_back(par2[i]);
            genes1[par2[i]] = true;
        }
        else
        {
            while (genes1[par2[ind2]])
            {

                ind2--;
            }
            child1.push_back(par2[ind2]);
            genes1[par2[ind2]] = true;
            ind2--;
        }

        if (!genes2[par1[i]])
        {
            child2.push_back(par1[i]);
            genes2[par1[i]] = true;
        }
        else
        {
            while (genes2[par1[ind1]])
            {
                ind1--;
            }
            child2.push_back(par1[ind1]);
            genes2[par1[ind1]] = true;
            ind1--;
        }
    }

    for (int i = point2 + 1; i < numLocations; i++)
    {
        child1.push_back(par1[i]);
        child2.push_back(par2[i]);
    }

    int to_mutate = rand() % 2;

    if (to_mutate)
    {
        int loc1, loc2;
        loc1 = rand() % (numLocations - 1) + 1;
        loc2 = rand() % (numLocations - 1) + 1;
        swap(child1[loc1], child1[loc2]);
        swap(child2[loc1], child2[loc2]);
    }

    return {child1, child2};
}


vector<vector<int>>final_order_saurabh(vector<vector<int>> &adjancy_matrix, int numRiders, vector<int> &endOfDelivery, vector<int> bagSize, vector<int> &package_volume, int reach_hub_before_this_time,vector<int>&order_of_delivery){
    int numLocations = adjancy_matrix.size()-1;
    vector<vector<int>>ans(numRiders);
    int max_package_volume = 1e9;

    vector<bool> is_delivered(numLocations + 1, false);
    is_delivered[0] = true;
    vector<int> temp_bag_size = bagSize;
    for (int i = 0; i < numRiders; i++)
    {
        int total_time = 0;
        int current_location = 0;

        for (int j = 1; j <= numLocations; j++)
        {
            if (is_delivered[order_of_delivery[j]])
                continue;

            if (temp_bag_size[i] <= max_package_volume and temp_bag_size[i] >= package_volume[order_of_delivery[j]] and adjancy_matrix[order_of_delivery[current_location]][order_of_delivery[j]] + total_time <= endOfDelivery[order_of_delivery[j]] and adjancy_matrix[order_of_delivery[current_location]][order_of_delivery[j]] + total_time + adjancy_matrix[order_of_delivery[current_location]][0] <= reach_hub_before_this_time)
            {
                ans[i].push_back(order_of_delivery[j]);
                total_time += adjancy_matrix[order_of_delivery[current_location]][order_of_delivery[j]];
                temp_bag_size[i] -= package_volume[order_of_delivery[j]];
                is_delivered[order_of_delivery[j]] = true;
                current_location = j;
            }
        }
    }
    return ans;

}

vector<vector<int>> delivering_object_using_genetic_algorithm(vector<vector<int>> &adjancy_matrix, int numRiders, vector<int> &endOfDelivery, vector<int> bagSize, vector<int> &package_volume, int reach_hub_before_this_time)
{
    int max_package_volume = 1e9;
    int generations = 10;
    int numLocations = adjancy_matrix.size() - 1;
    vector<vector<int>> ans(numRiders);
    if (numLocations == 0)
        return ans;

    set<pair<pair<int, int>, vector<int>>> st;
    initialize(st,generations,adjancy_matrix,numRiders,endOfDelivery,bagSize,package_volume,reach_hub_before_this_time);
 
    int current_location = 0;


   

    for (int i = 0; i < generations; i++)
    {
        if (st.size() == 2)
        {
            vector<int> par1, par2;
            auto it = st.begin();
            par1 = (*it).second;
            it++;
            par2 = (*it).second;
            vector<vector<int>> childs = crossover(par1, par2);
            par1 = childs[0];
            par2 = childs[1];
            pair<int, int>P,P2; 
            // P= calculateCost(adjancy_matrix, numRiders, endOfDelivery, bagSize, package_volume, reach_hub_before_this_time,par1);
            P=calculateCost_mayank(adjancy_matrix, numRiders, endOfDelivery, bagSize, package_volume, reach_hub_before_this_time,par1);
            // if(P.first<P2.first or (P.first==P2.first and P.second>P2.second)){
            //         P=P2;
            // }
            st.insert({{-P.first, P.second}, par1});


            // P= calculateCost(adjancy_matrix, numRiders, endOfDelivery, bagSize, package_volume, reach_hub_before_this_time,par2);
            P=calculateCost_mayank(adjancy_matrix, numRiders, endOfDelivery, bagSize, package_volume, reach_hub_before_this_time,par2);
            // if(P.first<P2.first or (P.first==P2.first and P.second>P2.second)){
            //         P=P2;
            // }
            st.insert({{-P.first, P.second}, par2});
        }
        else
        {
            int total_permutation = st.size();
            int ind_par1, ind_par2;
            do
            {
                ind_par1 = rand() % total_permutation;
                ind_par2 = rand() % total_permutation;

            } while (ind_par2 == ind_par1);
            vector<int> par1, par2;
            auto it = st.begin();
            for (int j = 0; j < ind_par1; j++)
            {
                it++;
            }
            par1 = (*it).second;
            it = st.begin();
            for (int j = 0; j < ind_par2; j++)
            {
                it++;
            }
            par2 = (*it).second;
            vector<vector<int>> childs = crossover(par1, par2);
            par1 = childs[0];
            par2 = childs[1];
            pair<int, int>P,P2; 
            // P= calculateCost(adjancy_matrix, numRiders, endOfDelivery, bagSize, package_volume, reach_hub_before_this_time,par1);
            P=calculateCost_mayank(adjancy_matrix, numRiders, endOfDelivery, bagSize, package_volume, reach_hub_before_this_time,par1);
            // if(P.first<P2.first or (P.first==P2.first and P.second>P2.second)){
            //         P=P2;
            // }
            st.insert({{-P.first, P.second}, par1});


            // P= calculateCost(adjancy_matrix, numRiders, endOfDelivery, bagSize, package_volume, reach_hub_before_this_time,par2);
            P=calculateCost_mayank(adjancy_matrix, numRiders, endOfDelivery, bagSize, package_volume, reach_hub_before_this_time,par2);
            // if(P.first<P2.first or (P.first==P2.first and P.second>P2.second)){
            //         P=P2;
            // }
            st.insert({{-P.first, P.second}, par2});
           
        }
    }

    vector<int> order_of_delivery = (*st.begin()).second;
    pair<int,int>P,P_M,P_Ab,P_An,P_S,P2;
    // P_S= calculateCost(adjancy_matrix, numRiders, endOfDelivery, bagSize, package_volume, reach_hub_before_this_time,order_of_delivery);
    // P=P_S;
    P2=calculateCost_mayank(adjancy_matrix, numRiders, endOfDelivery, bagSize, package_volume, reach_hub_before_this_time,order_of_delivery);
    // if(P.first<P2.first or (P.first==P2.first and P.second>P2.second)){
                    P=P2;
    // }
    P_M = P2;


    if(P==P_S){
        // // //cout<<"11111111111111111111111";
        return final_order_saurabh(adjancy_matrix, numRiders, endOfDelivery, bagSize, package_volume, reach_hub_before_this_time,order_of_delivery);
    }
    else
        if(P==P_M){
            return final_order_mayank(adjancy_matrix, numRiders, endOfDelivery, bagSize, package_volume, reach_hub_before_this_time,order_of_delivery);
        }
    return ans;
}















pair<int, int> calculateCost111(vector<vector<int>> &adjancy_matrix, int numRiders, vector<int> &endOfDelivery, vector<int> bagSize, vector<int> &package_volume, int reach_hub_before_this_time, vector<int> &order_of_delivery)
{
    int max_package_volume = 1e9;
    int total_successful_delivery = 0, total_dist = 0;

    vector<vector<int>> ans(numRiders);
    int numLocations = adjancy_matrix.size() - 1;

    int current_location = 0;

    vector<bool> is_delivered(numLocations + 1, false);
    is_delivered[0] = true;
    vector<int> temp_bag_size = bagSize;
    for (int i = 0; i < numRiders; i++)
    {
        int total_time = 0;
        current_location = 0;

        for (int j = 1; j <= numLocations; j++)
        {
            if (is_delivered[order_of_delivery[j]])
                continue;

            if (temp_bag_size[i] <= max_package_volume and temp_bag_size[i] >= package_volume[order_of_delivery[j]] and adjancy_matrix[order_of_delivery[current_location]][order_of_delivery[j]] + total_time <= endOfDelivery[order_of_delivery[j]] and adjancy_matrix[order_of_delivery[current_location]][order_of_delivery[j]] + total_time + adjancy_matrix[order_of_delivery[current_location]][0] <= reach_hub_before_this_time)
            {

                total_successful_delivery++;
                total_time += adjancy_matrix[order_of_delivery[current_location]][order_of_delivery[j]];
                temp_bag_size[i] -= package_volume[order_of_delivery[j]];
                is_delivered[order_of_delivery[j]] = true;
                current_location = j;
            }
        }
        total_dist += (total_time + adjancy_matrix[current_location][0]);
    }

    return {total_successful_delivery, total_dist};
}

vector<vector<int>> delivering_object_using_genetic_algorithm111(vector<vector<int>> &adjancy_matrix, int numRiders, vector<int> &endOfDelivery, vector<int> bagSize, vector<int> &package_volume, int reach_hub_before_this_time, vector<vector<int>> &previous_answer)
{
    int max_package_volume = 1e9;
    int generations = 10;
    int numLocations = adjancy_matrix.size() - 1;
    vector<vector<int>> ans(numRiders);
    if (numLocations == 0)
        return ans;

    set<pair<pair<int, int>, vector<int>>> st;

    vector<int> order_of_delivery;
    order_of_delivery.push_back(0);
    map<int, bool> is_taken;
    is_taken[0] = true;
    for (auto x11 : previous_answer)
    {
        for (auto y11 : x11)
        {
            order_of_delivery.push_back(y11);
            is_taken[y11] = true;
        }
    }
    for (int i = 1; i <= numLocations; i++)
    {
        if (!is_taken[i])
        {
            order_of_delivery.push_back(i);
        }
    }
    // // //cout<<endl;
    // for(auto &j:order_of_delivery){
    //     // //cout<<j<<" ";
    // }
    // // //cout<<endl;
    // // //cout<<endl;

    // vector<bool> vis(numLocations + 1, false);
    // vector<int> order_of_delivery;
    int current_location = 0;
    // order_of_delivery.push_back(0);
    // vis[0] = true;

    // for (int i = 1; i <= numLocations; i++)
    // {
    //     int nearest_location = -1, nearest_loc_value = 1e9;
    //     for (int j = 1; j <= numLocations; j++)
    //     {
    //         if (vis[j])
    //             continue;
    //         if (nearest_loc_value > adjancy_matrix[current_location][j])
    //         {
    //             nearest_loc_value = adjancy_matrix[current_location][j];
    //             nearest_location = j;
    //         }
    //     }
    //     vis[nearest_location] = true;
    //     order_of_delivery.push_back(nearest_location);
    //     current_location = nearest_location;
    // }

    for (int i = 0; i < generations; i++)
    {
        pair<int, int> P = calculateCost111(adjancy_matrix, numRiders, endOfDelivery, bagSize, package_volume, reach_hub_before_this_time, order_of_delivery);

        st.insert({{-P.first, P.second}, order_of_delivery});
        random_shuffle(order_of_delivery.begin() + 1, order_of_delivery.begin() + (rand() % (numLocations) + 1));
    }

    for (int i = 0; i < generations; i++)
    {
        if (st.size() == 2)
        {
            vector<int> par1, par2;
            auto it = st.begin();
            par1 = (*it).second;
            it++;
            par2 = (*it).second;
            vector<vector<int>> childs = crossover(par1, par2);
            par1 = childs[0];
            par2 = childs[1];
            pair<int, int> P = calculateCost111(adjancy_matrix, numRiders, endOfDelivery, bagSize, package_volume, reach_hub_before_this_time, par1);
            st.insert({{-P.first, P.second}, par1});
            P = calculateCost111(adjancy_matrix, numRiders, endOfDelivery, bagSize, package_volume, reach_hub_before_this_time, par2);
            st.insert({{-P.first, P.second}, par2});
        }
        else
        {
            int total_permutation = st.size();
            int ind_par1, ind_par2;
            do
            {
                ind_par1 = rand() % total_permutation;
                ind_par2 = rand() % total_permutation;

            } while (ind_par2 == ind_par1);
            vector<int> par1, par2;
            auto it = st.begin();
            for (int j = 0; j < ind_par1; j++)
            {
                it++;
            }
            par1 = (*it).second;
            it = st.begin();
            for (int j = 0; j < ind_par2; j++)
            {
                it++;
            }
            par2 = (*it).second;
            vector<vector<int>> childs = crossover(par1, par2);
            par1 = childs[0];
            par2 = childs[1];
            pair<int, int> P = calculateCost111(adjancy_matrix, numRiders, endOfDelivery, bagSize, package_volume, reach_hub_before_this_time, par1);
            st.insert({{-P.first, P.second}, par1});
            P = calculateCost111(adjancy_matrix, numRiders, endOfDelivery, bagSize, package_volume, reach_hub_before_this_time, par2);
            st.insert({{-P.first, P.second}, par2});
            while (st.size() > generations)
            {
                st.erase(--st.end());
            }
        }
    }

    order_of_delivery = (*st.begin()).second;
    vector<bool> is_delivered(numLocations + 1, false);
    is_delivered[0] = true;
    vector<int> temp_bag_size = bagSize;
    for (int i = 0; i < numRiders; i++)
    {
        int total_time = 0;
        current_location = 0;

        for (int j = 1; j <= numLocations; j++)
        {
            if (is_delivered[order_of_delivery[j]])
                continue;

            if (temp_bag_size[i] <= max_package_volume and temp_bag_size[i] >= package_volume[order_of_delivery[j]] and adjancy_matrix[order_of_delivery[current_location]][order_of_delivery[j]] + total_time <= endOfDelivery[order_of_delivery[j]] and adjancy_matrix[order_of_delivery[current_location]][order_of_delivery[j]] + total_time + adjancy_matrix[order_of_delivery[current_location]][0] <= reach_hub_before_this_time)
            {
                ans[i].push_back(order_of_delivery[j]);
                total_time += adjancy_matrix[order_of_delivery[current_location]][order_of_delivery[j]];
                temp_bag_size[i] -= package_volume[order_of_delivery[j]];
                is_delivered[order_of_delivery[j]] = true;
                current_location = j;
            }
        }
    }

    return ans;
}





//
//
//
//
//
//
// Riders Assigning Algorithms
//
//
//
//
//
//
//
//

// numRinders -> no of riders
// adjancy_matrix -> matrix containing distance of between each pair of points
// numLoxations -> no of delivery locations

// vector<vector<int>> adjancy_matrix;

// Jaskaran Code
vector<vector<int>> dp_on_EOD_and_lastrider(vector<vector<int>> &adjancy_matrix,
                                            int numRiders, vector<int> &endOfDelivery, vector<int> &bagSize, vector<int> &package_volume, int &Deadline)
{
    vector<pair<int, int>> sorted_endOfDelivery;
    for (int i = 1; i < endOfDelivery.size(); i++)
    {
        sorted_endOfDelivery.push_back({endOfDelivery[i], i});
    }
    sort(sorted_endOfDelivery.begin(), sorted_endOfDelivery.end());
    vector<vector<int>> ans_riderMatrix(numRiders);
    vector<vector<int>> pre(adjancy_matrix.size(), vector<int>(numRiders));
    vector<vector<vector<int>>> riders_traveintedDistance(adjancy_matrix.size(), vector<vector<int>>(numRiders, vector<int>(numRiders)));
    vector<vector<vector<int>>> riders_bagCapacity(adjancy_matrix.size(), vector<vector<int>>(numRiders, vector<int>(numRiders)));
    vector<vector<vector<int>>> riders_currentLocation(adjancy_matrix.size(), vector<vector<int>>(numRiders, vector<int>(numRiders)));
    vector<vector<int>> dp(adjancy_matrix.size(), vector<int>(numRiders));
    for (int i = 0; i < sorted_endOfDelivery.size(); i++)
    {
        for (int j = 0; j < numRiders; j++)
        {
            int dis = 1e9;
            for (int k = 0; k < numRiders; k++)
            {
                if ((riders_traveintedDistance[i][k][j] + adjancy_matrix[riders_currentLocation[i][k][j]][sorted_endOfDelivery[i].second] <= sorted_endOfDelivery[i].first) && (riders_bagCapacity[i][k][j] + package_volume[sorted_endOfDelivery[i].second] <= bagSize[j]) && (riders_traveintedDistance[i][k][j] + adjancy_matrix[riders_currentLocation[i][k][j]][sorted_endOfDelivery[i].second] + adjancy_matrix[sorted_endOfDelivery[i].second][0] <= Deadline))
                {
                    if (dp[i + 1][j] < dp[i][k] + 1)
                    {
                        pre[i + 1][j] = k;
                        dp[i + 1][j] = dp[i][k] + 1;
                        riders_currentLocation[i + 1][j] = riders_currentLocation[i][k];
                        riders_currentLocation[i + 1][j][j] = sorted_endOfDelivery[i].second;
                        riders_bagCapacity[i + 1][j] = riders_bagCapacity[i][k];
                        riders_bagCapacity[i + 1][j][j] += package_volume[sorted_endOfDelivery[i].second];
                        riders_traveintedDistance[i + 1][j] = riders_traveintedDistance[i][k];
                        riders_traveintedDistance[i + 1][j][j] += adjancy_matrix[riders_currentLocation[i][k][j]][sorted_endOfDelivery[i].second];
                    }
                    else if (dp[i + 1][j] == dp[i][k] + 1)
                    {
                        int sum = 0;
                        for (int f = 0; f < numRiders; f++)
                        {
                            sum += riders_traveintedDistance[i][k][f];
                        }
                        sum += adjancy_matrix[riders_currentLocation[i][k][j]][sorted_endOfDelivery[i].second];
                        if (sum < dis)
                        {
                            dis = sum;
                            pre[i + 1][j] = k;
                            dp[i + 1][j] = dp[i][k] + 1;
                            riders_currentLocation[i + 1][j] = riders_currentLocation[i][k];
                            riders_currentLocation[i + 1][j][j] = sorted_endOfDelivery[i].second;
                            riders_bagCapacity[i + 1][j] = riders_bagCapacity[i][k];
                            riders_bagCapacity[i + 1][j][j] += package_volume[sorted_endOfDelivery[i].second];
                            riders_traveintedDistance[i + 1][j] = riders_traveintedDistance[i][k];
                            riders_traveintedDistance[i + 1][j][j] += adjancy_matrix[riders_currentLocation[i][k][j]][sorted_endOfDelivery[i].second];
                        }
                    }
                }
                else
                {
                    if (dp[i + 1][j] < dp[i][k])
                    {
                        pre[i + 1][j] = k;
                        dp[i + 1][j] = dp[i][k];
                        riders_currentLocation[i + 1][j] = riders_currentLocation[i][k];
                        riders_bagCapacity[i + 1][j] = riders_bagCapacity[i][k];
                        riders_traveintedDistance[i + 1][j] = riders_traveintedDistance[i][k];
                    }
                    else if (dp[i + 1][j] == dp[i][k])
                    {
                        int sum = 0;
                        for (int f = 0; f < numRiders; f++)
                        {
                            sum += riders_traveintedDistance[i][k][f];
                        }
                        if (sum < dis)
                        {
                            dis = sum;
                            pre[i + 1][j] = k;
                            dp[i + 1][j] = dp[i][k];
                            riders_currentLocation[i + 1][j] = riders_currentLocation[i][k];
                            riders_bagCapacity[i + 1][j] = riders_bagCapacity[i][k];
                            riders_traveintedDistance[i + 1][j] = riders_traveintedDistance[i][k];
                        }
                    }
                }
            }
        }
    }
    int mx;
    int del_num = 0;
    for (int i = 0; i < numRiders; i++)
    {
        if (dp[sorted_endOfDelivery.size()][i] >= del_num)
        {
            del_num = dp[sorted_endOfDelivery.size()][i];
            mx = i;
        }
    }
    if (dp[sorted_endOfDelivery.size() - 1][pre[sorted_endOfDelivery.size()][mx]] < del_num)
    {
        ans_riderMatrix[mx].push_back(sorted_endOfDelivery.back().second);
    }
    mx = pre[sorted_endOfDelivery.size()][mx];
    for (int i = sorted_endOfDelivery.size() - 1; i >= 1; i--)
    {
        if (dp[i - 1][pre[i][mx]] < dp[i][mx])
        {
            ans_riderMatrix[mx].push_back(sorted_endOfDelivery[i - 1].second);
        }
        mx = pre[i][mx];
    }
    for (int i = 0; i < numRiders; i++)
    {
        reverse(ans_riderMatrix[i].begin(), ans_riderMatrix[i].end());
    }
    return ans_riderMatrix;
}

// Mayank Code
vector<vector<int>> delivering_based_on_End_of_Delivery_Time(int max_gap_between_points, vector<vector<int>> &adjancy_matrix,
                                                             int numRiders, vector<int> &endOfDelivery, vector<int> &bagSize, vector<int> &package_volume,
                                                             int reach_hub_before_this_time)
{
    // adjancy_matrix - 1-index // 0-th is the hub
    // package_volume - 1-index
    // endOfDelivery - 1-index
    vector<pair<int, int>> sorted_endOfDelivery;
    for (int i = 1; i < endOfDelivery.size(); i++)
    {
        sorted_endOfDelivery.push_back({endOfDelivery[i], i});
    }
    sort(sorted_endOfDelivery.begin(), sorted_endOfDelivery.end());

    vector<vector<int>> ans_riderMatrix(numRiders);
    vector<int> riders_traveintedDistance(numRiders, 0);
    vector<int> riders_bagCapacity(numRiders, 0);
    vector<int> riders_currentLocation(numRiders, 0);
    for (auto x : sorted_endOfDelivery)
    {
        vector<pair<int, int>> feasibleRiders;
        for (int i = 0; i < numRiders; i++)
        {
            if ((riders_traveintedDistance[i] + adjancy_matrix[riders_currentLocation[i]][x.second]) <= x.first && (riders_bagCapacity[i] + package_volume[x.second]) <= bagSize[i])
            {
                if (adjancy_matrix[riders_currentLocation[i]][x.second] <= max_gap_between_points)
                {
                    if ((riders_traveintedDistance[i] + adjancy_matrix[riders_currentLocation[i]][x.second] + adjancy_matrix[x.second][0]) <= reach_hub_before_this_time)
                    {
                        feasibleRiders.push_back({riders_traveintedDistance[i] + adjancy_matrix[riders_currentLocation[i]][x.second], i});
                    }
                }
            }
        }
        sort(feasibleRiders.begin(), feasibleRiders.end());
        if (feasibleRiders.size() > 0)
        {
            int rider = feasibleRiders[0].second;
            ans_riderMatrix[rider].push_back(x.second);
            riders_traveintedDistance[rider] = feasibleRiders[0].first;
            riders_bagCapacity[rider] += package_volume[x.second];
            riders_currentLocation[rider] = x.second;
            // }
            // int rider=feasibleRiders[0].second;
            //     ans_riderMatrix[rider].push_back(x.second);
            //     riders_traveintedDistance[rider]=feasibleRiders[0].first;
            //     riders_bagCapacity[rider]+=package_volume[x.second];
            //     riders_currentLocation[rider]=x.second;
        }
    }

    return ans_riderMatrix;
}

// To minimize the distance we should send all the possiblities that have same accuracy but this one is sending only one of them
// so return all of them to get the minimum distance
// Mayank Code
vector<vector<int>> delivering_based_on_End_of_Delivery_Time__Mainfunction(vector<vector<int>> &adjancy_matrix,
                                                                           int numRiders, vector<int> &endOfDelivery, vector<int> &bagSize, vector<int> &package_volume,
                                                                           int reach_hub_before_this_time)
{
    vector<vector<int>> riderOrder;
    vector<vector<vector<int>>> ans;
    for (int x = (limit_on_delivery_distances/10); x <= limit_on_delivery_distances; x += (limit_on_delivery_distances/10))
    {
        riderOrder = delivering_based_on_End_of_Delivery_Time(x, adjancy_matrix, numRiders, endOfDelivery, bagSize, package_volume, reach_hub_before_this_time);
        ans.push_back(riderOrder);
    }
    riderOrder =delivering_based_on_End_of_Delivery_Time(limit_on_delivery_distances, adjancy_matrix, numRiders, endOfDelivery, bagSize, package_volume, reach_hub_before_this_time);
    ans.push_back(riderOrder);


    vector<vector<int>> ans1(numRiders);
    vector<vector<vector<int>>> real_ans;
    int ans_count = 0;
    for (auto x : ans)
    {
        int count = 0;
        for (int i = 0; i < numRiders; i++)
        {
            for (auto y : x[i])
            {
                if (y != 0)
                    count++;
            }
        }
        if (count > ans_count)
        {
            ans1 = x;
            ans_count = count;
        }
    }

    for (auto x : ans)
    {
        int count = 0;
        for (int i = 0; i < numRiders; i++)
        {
            for (auto y : x[i])
            {
                if (y != 0)
                    count++;
            }
        }
        if (count == ans_count)
        {
            real_ans.push_back(x);
        }
    }

    // return real_ans;
    return ans1;
}

// Mayank Code
vector<vector<int>> delivering_based_on_End_of_Delivery_Time2(int max_gap_between_points, int max_package_volume, vector<vector<int>> &adjancy_matrix,
                                                              int numRiders, vector<int> &endOfDelivery, vector<int> &bagSize, vector<int> &package_volume,
                                                              int reach_hub_before_this_time)
{
    // adjancy_matrix - 1-index // 0-th is the hub
    // package_volume - 1-index
    // endOfDelivery - 1-index
    vector<pair<int, int>> sorted_endOfDelivery;
    for (int i = 1; i < endOfDelivery.size(); i++)
    {
        sorted_endOfDelivery.push_back({endOfDelivery[i], i});
    }
    sort(sorted_endOfDelivery.begin(), sorted_endOfDelivery.end());

    vector<vector<int>> ans_riderMatrix(numRiders);
    vector<int> riders_traveintedDistance(numRiders, 0);
    vector<int> riders_bagCapacity(numRiders, 0);
    vector<int> riders_currentLocation(numRiders, 0);
    for (auto x : sorted_endOfDelivery)
    {
        vector<pair<int, int>> feasibleRiders;
        for (int i = 0; i < numRiders; i++)
        {
            if ((riders_traveintedDistance[i] + adjancy_matrix[riders_currentLocation[i]][x.second]) <= x.first && (riders_bagCapacity[i] + package_volume[x.second]) <= bagSize[i])
            {
                if (adjancy_matrix[riders_currentLocation[i]][x.second] <= max_gap_between_points)
                {
                    if (package_volume[x.second] <= max_package_volume)
                    {
                        if ((riders_traveintedDistance[i] + adjancy_matrix[riders_currentLocation[i]][x.second] + adjancy_matrix[x.second][0]) <= reach_hub_before_this_time)
                        {
                            feasibleRiders.push_back({riders_traveintedDistance[i] + adjancy_matrix[riders_currentLocation[i]][x.second], i});
                        }
                    }
                }
            }
        }
        sort(feasibleRiders.begin(), feasibleRiders.end());
        if (feasibleRiders.size() > 0)
        {
            int rider = feasibleRiders[0].second;
            ans_riderMatrix[rider].push_back(x.second);
            riders_traveintedDistance[rider] = feasibleRiders[0].first;
            riders_bagCapacity[rider] += package_volume[x.second];
            riders_currentLocation[rider] = x.second;
            // }
            // int rider=feasibleRiders[0].second;
            //     ans_riderMatrix[rider].push_back(x.second);
            //     riders_traveintedDistance[rider]=feasibleRiders[0].first;
            //     riders_bagCapacity[rider]+=package_volume[x.second];
            //     riders_currentLocation[rider]=x.second;
        }
    }

    return ans_riderMatrix;
}

// To minimize the distance we should send all the possiblities that have same accuracy but this one is sending only one of them
// so return all of them to get the minimum distance
// Mayank Code
vector<vector<int>> delivering_based_on_End_of_Delivery_Time__Mainfunction2(vector<vector<int>> &adjancy_matrix,
                                                                            int numRiders, vector<int> &endOfDelivery, vector<int> &bagSize, vector<int> &package_volume,
                                                                            int reach_hub_before_this_time)
{

    // vector<vector<vector<int>>> ans;
    // for (int x = 5; x <= 500; x += 5)
    // {
    //     for (int y = 1; y <= 30; y++)
    //     {
    //         vector<vector<int>> riderOrder = delivering_based_on_End_of_Delivery_Time2(x, y, adjancy_matrix, numRiders, endOfDelivery, bagSize, package_volume, reach_hub_before_this_time);
    //         ans.push_back(riderOrder);
    //     }
    // }


    vector<vector<int>> riderOrder;
    vector<vector<vector<int>>> ans;
    for (int x = (limit_on_delivery_distances/10); x <= limit_on_delivery_distances; x += (limit_on_delivery_distances/10))
    {
        for (int y = (limit_on_package_volume/10); y <= limit_on_package_volume; y+=(limit_on_package_volume/10))
        {
            riderOrder = delivering_based_on_End_of_Delivery_Time2(x, y, adjancy_matrix, numRiders, endOfDelivery, bagSize, package_volume, reach_hub_before_this_time);
            ans.push_back(riderOrder);
        }
        riderOrder = delivering_based_on_End_of_Delivery_Time2(x, limit_on_package_volume, adjancy_matrix, numRiders, endOfDelivery, bagSize, package_volume, reach_hub_before_this_time);
        ans.push_back(riderOrder);
    }

    for (int y = (limit_on_package_volume/10); y <= limit_on_package_volume; y+=(limit_on_package_volume/10))
    {
        riderOrder = delivering_based_on_End_of_Delivery_Time2(limit_on_delivery_distances, y, adjancy_matrix, numRiders, endOfDelivery, bagSize, package_volume, reach_hub_before_this_time);
        ans.push_back(riderOrder);
    }
    riderOrder = delivering_based_on_End_of_Delivery_Time2(limit_on_delivery_distances, limit_on_package_volume, adjancy_matrix, numRiders, endOfDelivery, bagSize, package_volume, reach_hub_before_this_time);
    ans.push_back(riderOrder);


    vector<vector<int>> ans1(numRiders);
    vector<vector<vector<int>>> real_ans;
    int ans_count = 0;
    for (auto x : ans)
    {
        int count = 0;
        for (int i = 0; i < numRiders; i++)
        {
            for (auto y : x[i])
            {
                if (y != 0)
                    count++;
            }
        }
        if (count > ans_count)
        {
            ans1 = x;
            ans_count = count;
        }
    }

    for (auto x : ans)
    {
        int count = 0;
        for (int i = 0; i < numRiders; i++)
        {
            for (auto y : x[i])
            {
                if (y != 0)
                    count++;
            }
        }
        if (count == ans_count)
        {
            real_ans.push_back(x);
        }
    }

    // return real_ans;
    return ans1;
}

// Abhishek Code
vector<vector<int>> getRidersAssignment(int numRiders, vector<vector<int>> &dis, vector<int> &loc, int numLocations, vector<int> &times,
                                        vector<int> &riderBags, vector<int> &itemsSize)
{
    // Assumption: 0th index is warehouse and 1...dis.size() - 1 are the locations.
    // loc: order of locations from 1 to numLocations.
    vector<vector<int>> ans(numRiders);
    vector<int> lastRiderLocation(numRiders); // All riders are initially at warehouse.
    vector<int> ridersDis(numRiders);
    vector<int> riderCurrentBagSizes(numRiders);
    for (int i = 0; i < numLocations; ++i)
    {
        int locId = loc[i];
        int curItemSize = itemsSize[i];
        int best = -1;
        for (int r = 0; r < numRiders; ++r)
        {
            if (ridersDis[r] + dis[lastRiderLocation[r]][locId] > MAX)
                continue;
            int lastTime = times[lastRiderLocation[r]];
            if (lastTime + dis[lastRiderLocation[r]][locId] > times[locId])
                continue;
            if (riderCurrentBagSizes[r] + curItemSize > riderBags[r])
                continue;
            if (best == -1 || dis[lastRiderLocation[r]][locId] < dis[lastRiderLocation[best]][locId])
            {
                best = r;
            }
        }
        if (best != -1)
        {
            ans[best].push_back(locId);
            lastRiderLocation[best] = locId;
            riderCurrentBagSizes[best] += curItemSize;
            ridersDis[best] += dis[lastRiderLocation[best]][locId];
        }
    }
    return ans;
}

// Saurabh Code

vector<vector<int>> delivering_object_nearest(vector<vector<int>> &adjancy_matrix, int max_package_volume, int numRiders, vector<int> &endOfDelivery, vector<int> bagSize, vector<int> &package_volume, int reach_hub_before_this_time)
{
    vector<vector<int>> ans(numRiders);
    int numLocations = adjancy_matrix.size() - 1;
    vector<bool> vis(numLocations + 1, false);
    vector<int> order_of_delivery;
    int current_location = 0;
    order_of_delivery.push_back(0);
    vis[0] = true;
    for (int i = 1; i <= numLocations; i++)
    {
        int nearest_location = -1, nearest_loc_value = 1e9;
        for (int j = 1; j <= numLocations; j++)
        {
            if (vis[j])
                continue;
            if (nearest_loc_value > adjancy_matrix[current_location][j])
            {
                nearest_loc_value = adjancy_matrix[current_location][j];
                nearest_location = j;
            }
        }
        vis[nearest_location] = true;
        order_of_delivery.push_back(nearest_location);
        current_location = nearest_location;
    }
    vector<bool> is_delivered(numLocations + 1, false);
    is_delivered[0] = true;
    vector<int> temp_bag_size = bagSize;
    for (int i = 0; i < numRiders; i++)
    {
        int total_time = 0;
        current_location = 0;

        for (int j = 1; j <= numLocations; j++)
        {
            if (is_delivered[order_of_delivery[j]])
                continue;

            if (temp_bag_size[i] <= max_package_volume and temp_bag_size[i] >= package_volume[order_of_delivery[j]] and adjancy_matrix[order_of_delivery[current_location]][order_of_delivery[j]] + total_time <= endOfDelivery[order_of_delivery[j]] and adjancy_matrix[order_of_delivery[current_location]][order_of_delivery[j]] + total_time + adjancy_matrix[order_of_delivery[current_location]][0] <= reach_hub_before_this_time)
            {
                ans[i].push_back(order_of_delivery[j]);
                total_time += adjancy_matrix[order_of_delivery[current_location]][order_of_delivery[j]];
                temp_bag_size[i] -= package_volume[order_of_delivery[j]];
                is_delivered[order_of_delivery[j]] = true;
                current_location = j;
            }
        }
    }
    // int curr_location_index=1;
    // int curr_rider=0;
    // while(curr_location_index<=numLocations and curr_rider<numRiders){
    //   if(bagSize[curr_rider]>=package_volume[order_of_delivery[curr_location_index]]){
    //    bagSize[curr_rider]-=package_volume[order_of_delivery[curr_location_index]];
    //    ans[curr_rider].push_back(order_of_delivery[curr_location_index]);
    //    curr_location_index++;

    //   }
    //   else{
    //    curr_rider++;
    //   }
    // }

    // int curr_rider = 0;

    // for (int curr_location_index = 1; curr_location_index <= numLocations; curr_location_index++)
    // {

    //     int cnt = 0;
    //     while (cnt < 2 * numRiders)
    //     {
    //         cnt++;
    //         if (temp_bag_size[curr_rider] >= package_volume[order_of_delivery[curr_location_index]])
    //         {
    //             ans[curr_rider].push_back(order_of_delivery[curr_location_index]);
    //             temp_bag_size[curr_rider] -= package_volume[order_of_delivery[curr_location_index]];
    //             break;
    //         }
    //         else
    //         {
    //             ans[curr_rider].push_back(0);
    //             temp_bag_size[curr_rider] = bagSize[curr_rider];
    //             curr_rider = (curr_rider + 1) % numRiders;
    //         }
    //     }
    // }

    return ans;
}

vector<vector<int>> delivering_object_nearest1(vector<vector<int>> &adjancy_matrix, int numRiders, vector<int> &endOfDelivery, vector<int> bagSize, vector<int> &package_volume, int reach_hub_before_this_time)
{
    // vector<vector<vector<int>>> ans;
    // for (int y = 1; y <= 30; y++)
    // {
    //     vector<vector<int>> riderOrder = delivering_object_nearest(adjancy_matrix, y, numRiders, endOfDelivery, bagSize, package_volume, reach_hub_before_this_time);
    //     ans.push_back(riderOrder);
    // }

    vector<vector<int>> riderOrder;
    vector<vector<vector<int>>> ans;
    for (int y = (limit_on_package_volume/10); y <= limit_on_package_volume; y+=(limit_on_package_volume/10))
    {
        riderOrder = delivering_object_nearest(adjancy_matrix, y, numRiders, endOfDelivery, bagSize, package_volume, reach_hub_before_this_time);
        ans.push_back(riderOrder);
    }
    riderOrder = delivering_object_nearest(adjancy_matrix, limit_on_package_volume, numRiders, endOfDelivery, bagSize, package_volume, reach_hub_before_this_time);
    ans.push_back(riderOrder);
    



    vector<vector<int>> ans1(numRiders);
    vector<vector<vector<int>>> real_ans;
    int ans_count = 0;
    for (auto x : ans)
    {
        int count = 0;
        for (int i = 0; i < numRiders; i++)
        {
            for (auto y : x[i])
            {
                if (y != 0)
                    count++;
            }
        }
        if (count > ans_count)
        {
            ans1 = x;
            ans_count = count;
        }
    }

    for (auto x : ans)
    {
        int count = 0;
        for (int i = 0; i < numRiders; i++)
        {
            for (auto y : x[i])
            {
                if (y != 0)
                    count++;
            }
        }
        if (count == ans_count)
        {
            real_ans.push_back(x);
        }
    }

    // return real_ans;
    return ans1;
}

// Saurabh  second Code

vector<vector<int>> delivering_object_nearest_in_cyclic(vector<vector<int>> &adjancy_matrix, int max_package_volume, int numRiders, vector<int> &endOfDelivery, vector<int> bagSize, vector<int> &package_volume, int reach_hub_before_this_time)
{
    vector<vector<int>> ans(numRiders);
    int numLocations = adjancy_matrix.size() - 1;
    vector<bool> vis(numLocations + 1, false);
    vector<int> order_of_delivery;
    int current_location = 0;
    order_of_delivery.push_back(0);
    vis[0] = true;
    for (int i = 1; i <= numLocations; i++)
    {
        int nearest_location = -1, nearest_loc_value = 1e9;
        for (int j = 1; j <= numLocations; j++)
        {
            if (vis[j])
                continue;
            if (nearest_loc_value > adjancy_matrix[current_location][j])
            {
                nearest_loc_value = adjancy_matrix[current_location][j];
                nearest_location = j;
            }
        }
        vis[nearest_location] = true;
        order_of_delivery.push_back(nearest_location);
        current_location = nearest_location;
    }
    vector<bool> is_delivered(numLocations + 1, false);
    is_delivered[0] = true;
    vector<int> temp_bag_size = bagSize;
    current_location = 0;
    int j = 1;
    for (int i = 0; i < numRiders; i++)
    {
        int total_time = 0;

        current_location = 0;

        for (int cnt = 0; cnt < numLocations; cnt++)
        {
            j = (j + 1) % numLocations;
            j++;

            if (is_delivered[order_of_delivery[j]])
                continue;

            if (temp_bag_size[i] <= max_package_volume and temp_bag_size[i] >= package_volume[order_of_delivery[j]] and adjancy_matrix[order_of_delivery[current_location]][order_of_delivery[j]] + total_time <= endOfDelivery[order_of_delivery[j]] and adjancy_matrix[order_of_delivery[current_location]][order_of_delivery[j]] + total_time + adjancy_matrix[order_of_delivery[current_location]][0] <= reach_hub_before_this_time)
            {
                ans[i].push_back(order_of_delivery[j]);
                total_time += adjancy_matrix[order_of_delivery[current_location]][order_of_delivery[j]];
                temp_bag_size[i] -= package_volume[order_of_delivery[j]];
                is_delivered[order_of_delivery[j]] = true;
                current_location = j;
            }
        }
    }

    return ans;
}

vector<vector<int>> delivering_object_nearest_in_cyclic1(vector<vector<int>> &adjancy_matrix, int numRiders, vector<int> &endOfDelivery, vector<int> bagSize, vector<int> &package_volume, int reach_hub_before_this_time)
{
    // vector<vector<vector<int>>> ans;
    // for (int y = 1; y <= 30; y++)
    // {
    //     vector<vector<int>> riderOrder = delivering_object_nearest_in_cyclic(adjancy_matrix, y, numRiders, endOfDelivery, bagSize, package_volume, reach_hub_before_this_time);
    //     ans.push_back(riderOrder);
    // }

    
    vector<vector<int>> riderOrder;
    vector<vector<vector<int>>> ans;
    for (int y = (limit_on_package_volume/10); y <= limit_on_package_volume; y+=(limit_on_package_volume/10))
    {
        riderOrder = delivering_object_nearest_in_cyclic(adjancy_matrix, y, numRiders, endOfDelivery, bagSize, package_volume, reach_hub_before_this_time);
        ans.push_back(riderOrder);
    }
    riderOrder = delivering_object_nearest_in_cyclic(adjancy_matrix, limit_on_package_volume, numRiders, endOfDelivery, bagSize, package_volume, reach_hub_before_this_time);
    ans.push_back(riderOrder);    


    vector<vector<int>> ans1(numRiders);
    vector<vector<vector<int>>> real_ans;
    int ans_count = 0;
    for (auto x : ans)
    {
        int count = 0;
        for (int i = 0; i < numRiders; i++)
        {
            for (auto y : x[i])
            {
                if (y != 0)
                    count++;
            }
        }
        if (count > ans_count)
        {
            ans1 = x;
            ans_count = count;
        }
    }

    for (auto x : ans)
    {
        int count = 0;
        for (int i = 0; i < numRiders; i++)
        {
            for (auto y : x[i])
            {
                if (y != 0)
                    count++;
            }
        }
        if (count == ans_count)
        {
            real_ans.push_back(x);
        }
    }

    // return real_ans;
    return ans1;
}























// Mayank Code
// Code to minimize the time taken by the riders to get the order of deliveries for each rider which takes
//  minimum distance travelled  and return the
pair<vector<vector<int>>, vector<int>> minimize_the_distance_brute_force(vector<vector<int>> &adjancy_matrix, int numRiders,
                                                                         vector<int> &endOfDelivery, int reach_hub_before_this_time, vector<vector<int>> &delivery_order)
{
    vector<vector<int>> ans(numRiders);
    vector<int> total_dis(numRiders);

    for (int i = 0; i < numRiders; i++)
    {
        int num_deliveries = delivery_order[i].size();
        vector<int> arr(num_deliveries);

        for (int j = 0; j < num_deliveries; j++)
        {
            arr[j] = delivery_order[i][j];
        }

        vector<int> order;
        int distance = 1e9;
        int no_of_iterations = 0;

        do
        {

            int distance1 = 0;

            if (num_deliveries > 0)
            {
                distance1 += adjancy_matrix[0][arr[0]];
            }

            for (int j = 1; j < num_deliveries; j++)
            {
                distance1 += adjancy_matrix[arr[j - 1]][arr[j]];
            }

            if (num_deliveries > 0)
            {
                distance1 += adjancy_matrix[arr.back()][0];
            }

            if (distance1 < distance)
            {
                distance = distance1;
                order = arr;
            }

            // Cause to take it into time
            if (num_deliveries > 11)
            {
                no_of_iterations++;
                if (no_of_iterations > 100000)
                {
                    break;
                }
            }

        } while (next_permutation(arr.begin(), arr.end()));

        for (int j = 0; j < num_deliveries; j++)
        {
            order[j] = delivery_order[i][order[j]];
        }
        total_dis[i] = distance;
    }

    return {ans, total_dis};
}
















// Mayank Code
pair<int, int> add_pickUp_point_toTheList(int current_time, int item_volume, int item_entry_time, int num_riders,
                                    vector<int> &bag_volume, vector<int> &bag_volume_used, vector<int> &first_task_time, 
                                    vector<vector<vector<int>>> &tasks_old, int reach_hub_before_this_time, int pickUp_to_hub_distance)
{
    vector<vector<int>> time_required(num_riders);

    vector<vector<vector<int>>> tasks = tasks_old;
    for(int i=0;i<num_riders;i++)
    {
        vector<int> arr (5,0);
        arr[2]=reach_hub_before_this_time;
        tasks[i].push_back(arr);
    }

    for(int i=0; i<num_riders ;i++)
    {
        tasks[i][0][3] = first_task_time[i];
        for(int j=1;j<tasks[i].size();j++)
        {
            tasks[i][j][3] = tasks_old[i][j-1][3];
        }
        tasks[i].back()[4] = pickUp_to_hub_distance;
    }

    for (int i = 0; i < num_riders; i++)
    {
        int siz = tasks[i].size();
        vector<int> arr(siz, 1e9);

        if ((bag_volume_used[i] + item_volume) > bag_volume[i])
        {
            continue;
        }

        if (siz == 1)
        {
            if (2 * tasks[i][0][4] <= reach_hub_before_this_time && item_volume <= bag_volume[i])
            {
                arr[0] = tasks[i][0][4];
            }
        }
        else
        {
            // int mini_dis = reach_hub_before_this_time - tasks[i][siz-1][2];
            int mini_dis = 1e9;
            int volume_used = bag_volume_used[i];
            for(int j=0;j<siz;j++)
            {
                if(tasks[i][j][1] == 1)
                {
                    volume_used += tasks[i][j][0];
                }
            }

            for (int j = (siz - 1); j > 0; j--)
            {
                if(tasks[i][j][1] == 0)
                {
                    volume_used += tasks[i][j][0];
                }
                else
                {
                    volume_used -= tasks[i][j][0];
                }
                if((volume_used+item_volume) > bag_volume[i])
                {
                    continue;
                }

                if ((tasks[i][j][4] + tasks[i][j - 1][4] - tasks[i][j][3] + 2 * tasks[i][j - 1][3]) <= tasks[i][j][2])
                {
                    if ((tasks[i][j][4] + tasks[i][j - 1][4] - tasks[i][j][3] + tasks[i][j - 1][3]) <= mini_dis)
                    {
                        arr[j] = (tasks[i][j][4] + tasks[i][j - 1][4] - tasks[i][j][3] + 2 * tasks[i][j - 1][3]);
                    }
                    arr[j] = tasks[i][j - 1][4] - tasks[i][j][3] + 2 * tasks[i][j - 1][3];
                    
                }

                mini_dis = min(mini_dis, tasks[i][j][2] - tasks[i][j][3]);
            }
        }

        time_required[i] = arr;
    }

    bool ans = false;
    int mini = 1e9;
    int ans1 = -1, ans2 = -1;
    for (int i = 0; i < num_riders; i++)
    {
        for (int j = 0; j < time_required[i].size(); j++)
        {
            if (time_required[i][j] != 1e9)
            {
                if (time_required[i][j] < mini)
                {
                    ans = true;
                    mini = time_required[i][j];
                    ans1 = i;
                    ans2 = j;
                }
            }
        }
    }

    // ans1 and ans2 are -1 if not possible to add the pick up point
    // it means the pick up is added to rider ans1 and at location ans2
    // ans2 is 0-index

    return {ans1, ans2};







    // vector<vector<int>> new_tasks_order(num_riders);
    // vector<vector<vector<int>>> new_tasks = tasks;

    // if (ans)
    // {
    //     for (int i = 0; i < num_riders; i++)
    //     {
    //         if (i != ans1)
    //         {
    //             for (auto x11 : tasks[i])
    //             {
    //                 new_tasks_order[i].push_back(x11[5]);
    //             }
    //         }
    //         else
    //         {
    //             for (int j = 0; j < ans2; j++)
    //             {
    //                 new_tasks_order[i].push_back(tasks[i][j][5]);
    //             }
    //             new_tasks_order[i].push_back(current_item_index);
    //             for (int j = ans2; j < tasks[i].size(); j++)
    //             {
    //                 new_tasks_order[i].push_back(tasks[i][j][5]);
    //             }
    //         }
    //     }

    //     int siz = new_tasks[ans1].size();
    //     vector<vector<int>> arr;

    //     int extra_time = 0;
    //     if (ans2 == 0)
    //     {
    //         extra_time = time_required[ans1][ans2];
    //     }
    //     else
    //     {
    //         extra_time = tasks[ans1][ans2][4] + tasks[ans1][ans2 - 1][4] - tasks[ans1][ans2][3] + tasks[ans1][ans2 - 1][3];
    //     }

    //     for (int j = 0; j < ans2; j++)
    //     {
    //         arr.push_back(new_tasks[ans1][j]);
    //     }
    //     arr.push_back({item_volume, 1, 1000000000, time_required[ans1][ans2], -1, current_item_index});
    //     for (int j = ans2; j < tasks[ans1].size(); j++)
    //     {
    //         arr.push_back({new_tasks[ans1][j][0], new_tasks[ans1][j][1], new_tasks[ans1][j][2], new_tasks[ans1][j][3] + extra_time, new_tasks[ans1][j][4], new_tasks[ans1][j][5]});
    //     }

    //     bag_volume[ans1] = bag_volume_used[ans1] + item_volume;
    // }

    // ans tells if the solution exixts or not
    // ans1 is the rider no and ans2 is the no of the deliveries in the remaining one
    // ans1 and ans2 both are zero index
    // return {{ans, {ans1, ans2}}, new_tasks_order};
}

// define the value of the new_distance variable to run this function correctly
vector<vector<int>> remove_pickUp_point_fromTheList(int current_item_index, int current_time, int item_volume, int item_entry_time, int num_riders,
                                                    vector<int> &bag_volume, vector<vector<vector<int>>> &tasks, int reach_hub_before_this_time)
{
    // give the value of this variable
    int new_distance = 100;

    int ans1 = -1, ans2 = -1;
    vector<vector<int>> new_tasks_order(num_riders);

    for (int i = 0; i < tasks.size(); i++)
    {
        for (int j = 0; j < tasks[i].size(); i++)
        {
            if (tasks[i][j][5] == current_item_index)
            {
                ans1 = i;
                ans2 = j;
            }
            else
            {
                new_tasks_order[i].push_back(tasks[i][j][5]);
            }
        }
    }

    if (ans2 == 0)
    {
        return new_tasks_order;
    }

    vector<vector<vector<int>>> new_tasks = tasks;

    int extra_time = 0;
    if (ans2 != 0)
    {
        extra_time = new_distance - (tasks[ans1][ans2 + 1][3] - tasks[ans1][ans2 - 1][3]);
    }

    int siz = new_tasks[ans1].size();
    vector<vector<int>> arr;

    for (int j = 0; j < ans2; j++)
    {
        arr.push_back(new_tasks[ans1][j]);
    }
    for (int j = (ans2 + 1); j < tasks[ans1].size(); j++)
    {
        arr.push_back({new_tasks[ans1][j][0], new_tasks[ans1][j][1], new_tasks[ans1][j][2], new_tasks[ans1][j][3] + extra_time, new_tasks[ans1][j][4], new_tasks[ans1][j][5]});
    }

    // ans tells if the solution exixts or not
    // ans1 is the rider no and ans2 is the no of the deliveries in the remaining one
    // ans1 and ans2 both are zero index
    return new_tasks_order;
}

// Anurag Code
// Anurag - Assigning pick points to optimal riders in between of deliveries.

vector<vector<int>> rider_with_pickup_points(int pickup_point, vector<vector<int>> rider_delivery_points, vector<int> distance_pickup,
                                             vector<int> end_of_delivery, int size_pickup, vector<int> rider_bags, vector<int> product_size)
{
    vector<int> rider_bag_curr = rider_bags; // current item size to deliver
    for (int i = 0; i < rider_delivery_points.size(); i++)
    {
        for (auto e : rider_delivery_points[i])
        {
            rider_bag_curr[i] += product_size[e];
        }
    }
    pair<int, pair<int, int>> p = {(int)1e9, {-1, -1}}; // {time ,{rider,pos}}
    for (int i = 0; i < rider_delivery_points.size(); i++)
    {
        vector<int> delivery_points = rider_delivery_points[i];
        int curr = 0;
        for (int j = 0; j <= delivery_points.size(); j++)
        {
            if (j == 0)
            {
                if (distance_pickup[0] + distance_pickup[delivery_points[j]] <= end_of_delivery[delivery_points[j]] && rider_bag_curr[i] + size_pickup <= rider_bags[i] && p.first > distance_pickup[0])
                {
                    p = {distance_pickup[0], {i, j}};
                }
            }
            else if (j == delivery_points.size())
            {
                if (rider_bag_curr[i] + size_pickup <= rider_bags[i] && p.first > curr + distance_pickup[delivery_points[j - 1]])
                {
                    p = {curr + distance_pickup[delivery_points[j - 1]], {i, j}};
                }
            }
            else if (curr + distance_pickup[delivery_points[j - 1]] + distance_pickup[delivery_points[j]] <= end_of_delivery[delivery_points[j]] && rider_bag_curr[i] + size_pickup <= rider_bags[i] && p.first > curr + distance_pickup[delivery_points[j - 1]])
            {
                p = {curr + distance_pickup[delivery_points[j - 1]], {i, j}};
                // curr += adjancy_matrix[delivery_points[j - 1]][delivery_points[j]];
            }
            rider_bag_curr[i] -= product_size[delivery_points[j]];
        }
    }
    if (p.first != 1e9)
    {
        rider_delivery_points[p.second.first].insert(rider_delivery_points[p.second.first].begin() + p.second.second, pickup_point);
    }
    return rider_delivery_points;
}

int rand(int l, int r)
{
    static mt19937 rng(chrono::steady_clock::now().time_since_epoch().count());
    uniform_int_distribution<int> ludo(l, r);
    return ludo(rng);
}

// void solve() {
//     int numLocations;
//     cin >> numLocations;
//     vector<vector<int>> dis(numLocations + 1, vector<int> (numLocations + 1));
//     cin >> dis;
//     vector<int> loc(numLocations), times(numLocations + 1);
//     cin >> loc;
//     for (int i = 1; i <= numLocations; ++i) cin >> times[i];
//     int numRiders;
//     cin >> numRiders;
//     vector<int> riderBags(numRiders), itemSizes(numLocations + 1);
//     cin >> riderBags;
//     for (int i = 1; i <= numLocations; ++i) {
//         cin >> itemSizes[i];
//     }
//     int ridersToAssign;
//     cin >> ridersToAssign;
//     auto ans = getRidersAssignment(ridersToAssign, dis, loc, numLocations, times, riderBags, itemSizes);
//     for (int i = 0; i < numRiders; ++i) {
//         // //cout << "Rider = " << i << "\n";
//         for (int l: ans[i]) // //cout << l << ' ';
//         // //cout << "\n\n";
//     }
// }

//
//
//
//
//
//
//
// Testing the Code
//
//
//
//
//
//
//















pair<bool, int> goodSolution(int numRiders, vector<vector<int>> dis, int numLocations, vector<int> times,
                             vector<int> riderBags, vector<int> itemsSize, vector<vector<int>> ans, int reach_hub_before_this_time)
{
    if(ans.size()<numRiders)
    {
        return {false, 0};
    }
    // int reach_hub_before_this_time = 10000000;
    vector<int> riderTime(numRiders);
    int good = 0;
    for (int i = 0; i < numRiders; ++i)
    {
        auto &order = ans[i];
        int totTime = 0;
        int bagTot = 0;
        int globalTotTime = 0;
        for (int j = 0; j < (int)order.size(); ++j)
        {
            totTime += dis[j == 0 ? 0 : order[j - 1]][order[j]];
            globalTotTime += dis[j == 0 ? 0 : order[j - 1]][order[j]];
            if (bagTot > riderBags[i])
                return {false, 0};
            if (order[j] != 0)
                good += globalTotTime <= times[order[j]];
            // // //cout<<globalTotTime<<"/"<<times[order[j]]<<" ";
            bagTot += itemsSize[order[j]];
            if (bagTot > riderBags[i])
                return {false, 0};
            if (order[j] == 0)
            {
                // if (totTime > 300 * 60) return {false, 0};

                bagTot = 0;
                totTime = 0;
            }
        }

        if (totTime > reach_hub_before_this_time)
            return {false, 2};
        // // //cout<<"\n";
    }
    return {true, good};
}

int upperBoundOnNumberOfDeliveries(int numRiders, vector<vector<int>> dis, vector<int> loc, int numLocations, vector<int> times,
                                   vector<int> riderBags, vector<int> itemsSize)
{
    int maxLoad = 0;
    for (int i : riderBags)
        maxLoad += i;
    sort(itemsSize.begin(), itemsSize.end());
    int ans = 0;
    for (int i : itemsSize)
    {
        if (maxLoad - i < 0)
            break;
        ans++;
        maxLoad -= i;
    }
    return ans;
}

//
//
//
//
// Clustering Code for different algorithms
//
// 1. take_all_in_one - takeing all in one cluster
// 2. trial_round - distributing all linearly in clusters
// 3. random_clustering - distributing all randomly in clusters
// 4. KMeansClustering - clustering based on adjancy matrix
// 5. KMeansClustering_latlong - clustering based on latitudes and longitudes
// 6. GivenLocationClustering - clustering based on the given locations
// 7. DBSCAN - density based scanning clustering algorithm
//
//
//
//
//
//

vector<vector<int>> take_all_in_one(vector<vector<int>> &adjancy_matrix, int num_clusters, int numLocations)
{
    vector<vector<int>> ans(1);
    for (int i = 1; i <= numLocations; i++)
    {
        ans[0].push_back(i);
    }
    return ans;
}

vector<vector<int>> trial_round(vector<vector<int>> &adjancy_matrix, int num_clusters, int numLocations)
{
    vector<vector<int>> ans(3);
    for (int i = 1; i < numLocations / 3; i++)
    {
        ans[0].push_back(i);
    }
    for (int i = numLocations / 3; i < (2 * numLocations) / 3; i++)
    {
        ans[1].push_back(i);
    }
    for (int i = (2 * numLocations) / 3; i <= numLocations; i++)
    {
        ans[2].push_back(i);
    }
    return ans;
}

vector<vector<int>> random_clustering(vector<vector<int>> &adjancy_matrix, int num_clusters, int numLocations)
{
    vector<vector<int>> ans(num_clusters);
    for (int i = 1; i <= numLocations; i++)
    {
        int it = rand() % num_clusters;
        ans[it].push_back(i);
    }
    return ans;
}

vector<vector<int>> KMeansClustering(vector<vector<int>> &adjancy_matrix, int num_clusters, int numLocations)
{
    vector<vector<int>> ans(num_clusters);
    vector<int> centers(num_clusters);
    vector<vector<int>> clusters(num_clusters);

    for (int i = 0; i < num_clusters; i++)
    {
        centers[i] = rand() % numLocations + 1;
    }

    for (int i = 0; i < 200; i++)
    {

        for (int j = 0; j < num_clusters; j++)
        {
            clusters[j].clear();
        }

        for (int j = 1; j <= numLocations; j++)
        {
            int index = 0;
            int maxSimilarity = 1e9;
            for (int k = 0; k < num_clusters; k++)
            {
                if (adjancy_matrix[j][centers[k]] < maxSimilarity)
                {
                    maxSimilarity = adjancy_matrix[j][centers[k]];
                    index = k;
                }
            }
            clusters[index].push_back(j);
        }

        // for(int j=0;j<num_clusters;j++)
        // {
        //     for(auto x:clusters[j])
        //         // //cout<<x<<" ";// //cout<<"\n";
        // }// //cout<<"\n";

        for (int j = 0; j < num_clusters; j++)
        {
            vector<int> arr(clusters[j].size(), 0);
            if (clusters[j].size() == 0)
                continue;

            int ans1 = 0, ans2 = 1e9;

            for (int i1 = 0; i1 < clusters[j].size(); i1++)
            {
                for (int i2 = 0; i2 < clusters[j].size(); i2++)
                {
                    arr[i1] += adjancy_matrix[clusters[j][i1]][clusters[j][i2]];
                }
                if (arr[i1] < ans2)
                {
                    ans2 = arr[i1];
                    ans1 = clusters[j][i1];
                }
            }

            centers[j] = ans1;
        }

        // for(int j=0;j<num_clusters;j++)
        // {
        //     // //cout<<centers[j]<<" ";
        // }// //cout<<"\n";
    }

    return clusters;
}

// #define _USE_MATH_DEFINES
// #include <cmath>

// #include <cmath>
// using namespace std;

long double toRadians(const long double degree)
{
    // cmath library in C++ defines the constant
    // M_PI as the value of pi accurate to 1e-30
    // long double one_deg = (M_PI) / 180;
    long double one_deg = 1 / 180;
    return (one_deg * degree);
}

int find_distance(pair<double, double> &a, pair<double, double> &b)
{
    // Convert the latitudes
    // and longitudes
    // from degree to radians.
    double lat1 = toRadians(a.first);
    double long1 = toRadians(a.second);
    double lat2 = toRadians(a.first);
    double long2 = toRadians(a.second);

    // Haversine Formula
    long double dlong = long2 - long1;
    long double dlat = lat2 - lat1;

    long double ans = pow(sin(dlat / 2), 2) +
                      cos(lat1) * cos(lat2) *
                          pow(sin(dlong / 2), 2);

    ans = 2 * asin(sqrt(ans));

    // Radius of Earth in
    // Kilometers, R = 6371
    // Use R = 3956 for miles
    long double R = 6371;

    // Calculate the result
    ans = ans * R;

    // Value in KILOMETRES
    ans = ans / 40;
    ans *= 3600;
    int ans1 = ans;

    // Value is calculated by assuming that the speed of the rider is 40km/h as normal
    // and thinking that the euclidean distance will be lesser than the real distance
    return ans1;
}

vector<vector<int>> KMeansClustering_latlong(vector<pair<double, double>> &coordinates, int num_clusters, int numLocations)
{
    vector<vector<int>> ans(num_clusters);
    vector<pair<double, double>> centers(num_clusters);
    vector<vector<int>> clusters(num_clusters);

    for (int i = 0; i < num_clusters; i++)
    {
        int it = rand() % numLocations + 1;
        centers[i] = coordinates[it];
    }

    for (int i = 0; i < 200; i++)
    {

        for (int j = 0; j < num_clusters; j++)
        {
            clusters[j].clear();
        }

        for (int j = 1; j <= numLocations; j++)
        {
            int index = 0;
            int maxSimilarity = 1e9;
            for (int k = 0; k < num_clusters; k++)
            {
                int distance = find_distance(coordinates[j], centers[k]);
                if (distance < maxSimilarity)
                {
                    maxSimilarity = distance;
                    index = k;
                }
            }
            clusters[index].push_back(j);
        }

        for (int j = 0; j < num_clusters; j++)
        {
            // vector<int> arr(clusters[j].size(),0);
            if (clusters[j].size() == 0)
                continue;

            pair<double, double> ans1 = {0, 0};

            for (int i1 = 0; i1 < clusters[j].size(); i1++)
            {
                ans1.first += coordinates[clusters[j][i1]].first;
                ans1.second += coordinates[clusters[j][i1]].second;
            }
            centers[j] = ans1;
        }
    }

    return clusters;
}

vector<vector<int>> GivenLocationClustering(vector<vector<int>> &adjancy_matrix, int numLocations, vector<int> &area)
{
    int maxi = 0;
    for (int i = 1; i <= numLocations; i++)
    {
        maxi = max(maxi, area[i]);
    }
    vector<vector<int>> ans(maxi);
    for (int i = 1; i <= numLocations; i++)
    {
        ans[area[i] - 1].push_back(i);
    }
    return ans;
}






// define the value of MINIMUM_POINTS as #define MINIMUM_POINTS currently set as 1
// define the value of EPSILON as #define EPSILON currently set as 100 m^2 define in a circle in metre squre


// define the value of MINIMUM_POINTS as #define MINIMUM_POINTS currently set as 1
// define the value of EPSILON as #define EPSILON currently set as 100 m^2 define in a circle in metre squre



#include <vector>
#include <cmath>

#define UNCLASSIFIED -1
#define CORE_POINT 1
#define BORDER_POINT 2
#define NOISE -2
#define SUCCESS 0
#define FAILURE -3

#include <stdio.h>
#include <iostream>


using namespace std;

typedef struct Point_
{
    int x;  // X, Y, Z position
    int clusterID;  // clustered ID
}Point;

class DBSCAN {
public:    
    DBSCAN(unsigned int minPts, float eps, vector<Point> points){
        m_minPoints = minPts;
        m_epsilon = eps;
        m_points = points;
        m_pointSize = points.size();
    }
    ~DBSCAN(){}

    int run(vector<vector<int>> &adjancy_matrix);
    vector<int> calculateCluster(Point point,vector<vector<int>> &adjancy_matrix);
    int expandCluster(Point point, int clusterID,vector<vector<int>> &adjancy_matrix);
    inline int calculateDistance(const Point& pointCore, const Point& pointTarget,vector<vector<int>> &adjancy_matrix);

    int getTotalPointSize() {return m_pointSize;}
    int getMinimumClusterSize() {return m_minPoints;}
    int getEpsilonSize() {return m_epsilon;}
    
public:
    vector<Point> m_points;
    
private:    
    unsigned int m_pointSize;
    unsigned int m_minPoints;
    int m_epsilon;
};

int DBSCAN::run(vector<vector<int>> &adjancy_matrix)
{
    int clusterID = 1;
    vector<Point>::iterator iter;
    for(iter = m_points.begin(); iter != m_points.end(); ++iter)
    {
        if ( iter->clusterID == UNCLASSIFIED )
        {   
            if ( expandCluster(*iter, clusterID,adjancy_matrix) != FAILURE )
            {
                clusterID += 1;
            }
        }
    }

    return 0;
}

int DBSCAN::expandCluster(Point point, int clusterID,vector<vector<int>> &adjancy_matrix)
{    
    vector<int> clusterSeeds = calculateCluster(point,adjancy_matrix);

    if ( clusterSeeds.size() < m_minPoints )
    {
        point.clusterID = NOISE;
        return FAILURE;
    }
    else
    {
        int index = 0, indexCorePoint = 0;
        vector<int>::iterator iterSeeds;
        for( iterSeeds = clusterSeeds.begin(); iterSeeds != clusterSeeds.end(); ++iterSeeds)
        {
            m_points.at(*iterSeeds).clusterID = clusterID;
            if (adjancy_matrix[m_points.at(*iterSeeds).x][point.x]==0)
            {
                indexCorePoint = index;
            }
            ++index;
        }
        clusterSeeds.erase(clusterSeeds.begin()+indexCorePoint);

        for( vector<int>::size_type i = 0, n = clusterSeeds.size(); i < n; ++i )
        {
            vector<int> clusterNeighors = calculateCluster(m_points.at(clusterSeeds[i]),adjancy_matrix);

            if ( clusterNeighors.size() >= m_minPoints )
            {
                vector<int>::iterator iterNeighors;
                for ( iterNeighors = clusterNeighors.begin(); iterNeighors != clusterNeighors.end(); ++iterNeighors )
                {
                    if ( m_points.at(*iterNeighors).clusterID == UNCLASSIFIED || m_points.at(*iterNeighors).clusterID == NOISE )
                    {
                        if ( m_points.at(*iterNeighors).clusterID == UNCLASSIFIED )
                        {
                            clusterSeeds.push_back(*iterNeighors);
                            n = clusterSeeds.size();
                        }
                        m_points.at(*iterNeighors).clusterID = clusterID;
                    }
                }
            }
        }

        return SUCCESS;
    }
}

vector<int> DBSCAN::calculateCluster(Point point,vector<vector<int>> &adjancy_matrix)
{
    int index = 0;
    vector<Point>::iterator iter;
    vector<int> clusterIndex;
    for( iter = m_points.begin(); iter != m_points.end(); ++iter)
    {
        if ( calculateDistance(point, *iter, adjancy_matrix) <= m_epsilon )
        {
            clusterIndex.push_back(index);
        }
        index++;
    }
    return clusterIndex;
}

inline int DBSCAN::calculateDistance(const Point& pointCore, const Point& pointTarget,vector<vector<int>> &adjancy_matrix)
{ 
    return adjancy_matrix[pointCore.x][pointTarget.x];
}

void takeData(vector<Point>& points, vector<vector<int>> &adjancy_matrix)
{
    // load point cloud

    unsigned int minpts, num_points, cluster, i = 0;
    double epsilon;
    num_points=adjancy_matrix.size()-1;
    Point *p = (Point *)calloc(num_points, sizeof(Point));
    while (i < num_points)
    {       
          p[i].x=i+1;
          p[i].clusterID=UNCLASSIFIED;
          points.push_back(p[i]);
          ++i;
    }

    free(p);
}

vector<vector<int>> giveResults(vector<Point>& points, int num_points)
{
    int i = 0;
    int mx=0;
    while (i < num_points)
    {
          mx=max(mx,points[i].clusterID);
          ++i;
    }
    i=0;
    vector<vector<int>> clusters(mx);
    while (i < num_points)
    {
          clusters[points[i].clusterID-1].push_back(i+1);
          ++i;
    }
    return clusters;
}
vector<vector<int>> Scan(vector<vector<int>> &adjancy_matrix,int &num_clusters){
    vector<Point> points;

    // read point data
    takeData(points,adjancy_matrix);

    // constructor
    int l=0;
    int r=1e9;
    while(l<r){
        int m=(l+r)/2;
        DBSCAN ds(MINIMUM_POINTS, m, points);
        ds.run(adjancy_matrix);
        if(giveResults(ds.m_points, ds.getTotalPointSize()).size()<=num_clusters){
            r=m;
        }
        else{
            l=m+1;
        }
    }
    DBSCAN ds(MINIMUM_POINTS, l, points);
    ds.run(adjancy_matrix);
    // result of DBSCAN algorithm
    // return {};
    return giveResults(ds.m_points, ds.getTotalPointSize());  
}
// int main()
// {    
//     vector<vector<int>> adjancy_matrix={{0,2000,5,2},{1000,0,7000,3000},{4,6000,0,6},{3,2000,6,0}};
//     int num_clusters=2;
//     vector<vector<int>> x=Scan(adjancy_matrix,num_clusters);

//     for(auto u:x){
//         for(auto c:u){
//             // //cout<<c<<" ";
//         }
//         // //cout<<endl;
//     }

//     return 0;
// }





// void solve()
vector<vector<int>> solve(int numLocations, vector<vector<int>> &dis, vector<int> &itemSizes, vector<int> &times, 
                vector<pair<double,double>> &coordinates, vector<int> &area, int numRiders, vector<int> &riderBags, 
                int reach_hub_before_this_time)
{

    vector<vector<int>> timepass_array(numRiders);
    // int numLocations = rand(80, 100);
    //    cin >> numLocations;
    // vector<vector<int>> dis(numLocations + 1, vector<int>(numLocations + 1, 0));
    // for (int i = 0; i <= numLocations; ++i)
    // {
    //     for (int j = 0; j <= numLocations; ++j)
    //     {
    //         if (i != j)
    //             dis[i][j] = rand(10, 30);
    //     }
    // }

    // for (int i = 0; i <= numLocations; ++i) {
    //     for (int j = 0; j < i; ++j) {
    //         dis[i][j] = dis[j][i];
    //     }
    // }
    vector<pair<int, int>> temp(numLocations);
    vector<int> loc(numLocations);
    for (int i = 0; i < numLocations; ++i)
    {
        temp[i] = {times[i+1], i + 1};
    }
    sort(temp.begin(), temp.end());
    for (int i = 1; i <= numLocations; ++i)
    {
        loc[i - 1] = temp[i - 1].second;
        // times[i] = temp[i - 1].first;
        //        cin >> times[i];
    }
    // int numRiders = rand(15, 20);

    // //    cin >> numRiders;
    // vector<int> riderBags(numRiders), itemSizes(numLocations + 1);
    // for (int i = 0; i < numRiders; ++i)
    // {
    //     riderBags[i] = rand(10, 30);
    // }
    // //    cin >> riderBags;
    // for (int i = 1; i < numLocations; ++i)
    // {
    //     //        cin >> itemSizes[i];
    //     itemSizes[i] = rand(4, 8);
    // }
    // for (int i = numLocations / 2; i <= numLocations; ++i)
    // {
    //     //        cin >> itemSizes[i];
    //     itemSizes[i] = rand(1, 5);
    // }
    int ridersToAssign = numRiders;


    // //cout << "Number of delivery locations: " << numLocations << "\n";
    // //cout << "Number of riders: " << numRiders << "\n";
    // for (int i = 0; i <= numLocations; ++i)
    // {
    //     for (int j = 0; j <= numLocations; ++j)
    //         // //cout << dis[i][j] << ' ';
    //     // //cout << "\n";
    // }
    // // //cout << "Location order: " << loc << "\n";
    // // //cout << "Times order: " << times << "\n";
    // // //cout << "Rider Bags sizes = " << riderBags << "\n";
    // // //cout << "Item Bags sizes = " << itemSizes << "\n";

    // int reach_hub_before_this_time = 10000000;

    // // //cout<<"\n\n\n"/;
    // KMeansClustering(numLocations, 10, dis);
    // // //cout<<"\n\n\n\n\n\n";

    vector<pair<int, vector<vector<int>>>> record_all_answers;

    // vector<int> area(numLocations + 1, 0);
    // for (int i = 0; i <= numLocations; i++)
    // {
    //     area[i] = rand(1, 5);
    // }

    // vector<pair<double, double>> coordinates(numLocations + 1); // latitudes and longitudes
    // for (int i = 0; i <= numLocations; i++)
    // {
    //     coordinates[i].first = rand();
    //     coordinates[i].second = rand();
    //     // // //cout<<coordinates[i].first<<" "<<coordinates[i].second<<" ";
    // }

    int no_of_clusters = min(5, numRiders / 2);
    // no_of_clusters = 5;
    no_of_clusters = min({no_of_clusters,numRiders, numLocations});

    vector<vector<vector<int>>> clustering_list;

    // vector<vector<int>> take_all_in_one_vector = take_all_in_one(dis, no_of_clusters, numLocations);
    // clustering_list.push_back(take_all_in_one_vector);

    // vector<vector<int>> trial_round_vector;

    // if(no_of_clusters>=3)
    // {
    //     trial_round_vector = trial_round(dis, no_of_clusters, numLocations);
    //     clustering_list.push_back(trial_round_vector);
    // }

    // vector<vector<int>> random_clustering_vector = random_clustering(dis, no_of_clusters, numLocations);
    // clustering_list.push_back(random_clustering_vector);


    vector<vector<int>> KMeansClustering_vector = KMeansClustering(dis, no_of_clusters, numLocations);
    clustering_list.push_back(KMeansClustering_vector);

    // vector<vector<int>> KMeansClustering_latlong_vector = KMeansClustering_latlong(coordinates,no_of_clusters,numLocations);
    // clustering_list.push_back(KMeansClustering_latlong_vector);

    vector<vector<int>> GivenLocationClustering_vector = GivenLocationClustering(dis, numLocations, area);
    clustering_list.push_back(GivenLocationClustering_vector);

    vector<vector<int>> density_based_clustering = Scan(dis,no_of_clusters);
    clustering_list.push_back(density_based_clustering);




    // // //cout<<density_based_clustering.size()<<"\n";
    // for(auto x:density_based_clustering)
    // {
    //     for(auto y:x)
    //         // //cout<<y<<" ";
    //     // //cout<<"\n";
    // }

    // for (auto clustering_algorithm : clustering_list)
    // {
    //     for(auto x:clustering_algorithm)
    //     {
    //         for(auto y:x)
    //             // //cout<<y<<" ";
    //         // //cout<<"\n";
    //     }
    //     // //cout<<"\n\n\n";
    // }

    int all_answers = 6;
    // Jaskaran Ans
    // // //cout << "\n\n\n";
    // // //cout << "Jaskaran Ans"<< "\n";
    // auto ans2 = dp_on_EOD_and_lastrider(dis, ridersToAssign, times, riderBags, itemSizes);
    // auto checker = goodSolution(numRiders, dis, numLocations, times, riderBags, itemSizes, ans2);
    // // //cout << checker.first << " " << checker.second << "\n";

    // ll count1111=0;
    for (auto clustering_algorithm : clustering_list)
    {
        // if(count1111==2)
        //     break;
        // count1111++;
        // // //cout << "\n";
        for (int iter = 0; iter < all_answers; iter++)
        {
            // // //cout << "\n";z

            vector<vector<int>> ans2(numRiders);

            // if(iter==0)// //cout << "Jaskaran Ans"<< "\t\t\t\t";
            // if(iter==1)// //cout << "Mayank Ans"<< "\t\t\t\t\t";
            // if(iter==2)// //cout << "Mayank second Ans"<< "\t\t\t";
            // if(iter==3)// //cout << "Abhishek Ans"<< "\t\t\t\t";
            // if(iter==4)// //cout << "Saurabh Ans"<< "\t\t\t\t\t";
            // if(iter==5)// //cout << "Saurabh second Ans"<< "\t\t\t";

            int total_riders = 0;
            int total_riders1 = 0;

            int it = 0;
            int count_clusters=0;
            vector<int> riders_list(clustering_algorithm.size());
            for (int i = 0; i < clustering_algorithm.size(); i++)
            {
                if(clustering_algorithm[i].size()==0)
                {
                    continue;
                }
                count_clusters++;
                if (total_riders1 >= numRiders)
                    break;
                riders_list[i] = (((clustering_algorithm[i].size()) * numRiders) / numLocations);
                // if (riders_list[i] == 0)
                // {
                //     riders_list[i] = 1;
                // }
                total_riders1 += riders_list[i];
            }

            int take_riders = (numRiders - total_riders1) / (count_clusters);

            for (int i = 0; i < clustering_algorithm.size(); i++)
            {
                if (total_riders1 >= numRiders)
                    break;
                if(clustering_algorithm[i].size()==0)
                {
                    continue;
                }
                total_riders1 += take_riders;
                riders_list[i]+= take_riders;
            }
            for (int i = 0; i < clustering_algorithm.size(); i++)
            {
                if (total_riders1 >= numRiders)
                    break;
                if(clustering_algorithm[i].size()==0)
                {
                    continue;
                }
                total_riders1++;
                riders_list[i]++;
            }
            for (int i = 0; i < clustering_algorithm.size(); i++)
            {
                if (total_riders1 >= numRiders)
                    break;
                if(clustering_algorithm[i].size()==0)
                {
                    continue;
                }
                total_riders1++;
                riders_list[i]++;
            }
            for (int i = 0; i < clustering_algorithm.size(); i++)
            {
                if (total_riders1 >= numRiders)
                    break;
                if(clustering_algorithm[i].size()==0)
                {
                    continue;
                }
                total_riders1++;
                riders_list[i]++;
            }
            for (int i = 0; i < clustering_algorithm.size(); i++)
            {
                if (total_riders1 >= numRiders)
                    break;
                if(clustering_algorithm[i].size()==0)
                {
                    continue;
                }
                total_riders1++;
                riders_list[i]++;
            }




            // // //cout<<clustering_algorithm.size()<<" ";
            // // //cout<<riders_list.size()<<" ";
            // // //cout<<it<<"\n";
            for (auto list : clustering_algorithm)
            {
                int deliveries = list.size();
                if(deliveries==0)continue;
                reverse(list.begin(), list.end());
                list.push_back(0);
                reverse(list.begin(), list.end());
                vector<vector<int>> adjancy_matrix(deliveries + 1, vector<int>(deliveries + 1));

                for (int i = 0; i <= deliveries; i++)
                {
                    for (int j = 0; j <= deliveries; j++)
                    {
                        adjancy_matrix[i][j] = dis[list[i]][list[j]];
                    }
                }

                vector<int> endOfDelivery(deliveries + 1, 0);
                vector<int> package_volume(deliveries + 1, 0);
                for (int i = 1; i <= deliveries; i++)
                {
                    endOfDelivery[i] = times[list[i]];
                    package_volume[i] = itemSizes[list[i]];
                }

                int ridersTaken = riders_list[it];
                if(ridersTaken==0)
                {
                    continue;
                }
                // // //cout<<ridersTaken<<" \n";
                it++;
                vector<int> bagSize(ridersTaken);
                for (int i = 0; i < ridersTaken; i++)
                {
                    bagSize[i] = riderBags[i + total_riders];
                }
                vector<vector<int>> ans3;
                if (iter == 0)
                {

                    ans3 = dp_on_EOD_and_lastrider(adjancy_matrix, ridersTaken, endOfDelivery, bagSize, package_volume, reach_hub_before_this_time);
                    // for(auto x:ans3)
                    // {
                    //     for(auto y:x)
                    //         // //cout<<y<<" ";
                    //     // //cout<<"\n";
                    // }
                }
                if (iter == 1)
                {
                    ans3 = delivering_based_on_End_of_Delivery_Time__Mainfunction(adjancy_matrix, ridersTaken,
                                                                                  endOfDelivery, bagSize, package_volume, reach_hub_before_this_time);
                }
                if (iter == 2)
                {
                    ans3 = delivering_based_on_End_of_Delivery_Time__Mainfunction2(adjancy_matrix, ridersTaken,
                                                                                   endOfDelivery, bagSize, package_volume, reach_hub_before_this_time);
                }
                if (iter == 3)
                {
                }
                if (iter == 4)
                {
                    ans3 = delivering_object_nearest1(adjancy_matrix, ridersTaken,
                                                      endOfDelivery, bagSize, package_volume, reach_hub_before_this_time);
                }
                if (iter == 5)
                {
                    ans3 = delivering_object_nearest_in_cyclic1(adjancy_matrix, ridersTaken,
                                                                endOfDelivery, bagSize, package_volume, reach_hub_before_this_time);
                }

                for (int i = 0; i < ans3.size(); i++)
                {
                    for (auto x : ans3[i])
                    {
                        ans2[total_riders + i].push_back(list[x]);
                    }
                }

                total_riders += ridersTaken;
            }

            // for(auto x11:ans2)
            // {
            //     for(auto y11:x11)
            //         // //cout<<y11<<" ";
            //     // //cout<<"\n";
            // }
            // // //cout<<"\n";
            // break;

            auto checker = goodSolution(numRiders, dis, numLocations, times, riderBags, itemSizes, ans2, reach_hub_before_this_time);
            // // //cout << checker.first << " " << checker.second << " ";

            int count1 = 0;
            for (int i = 0; i < numRiders; i++)
            {
                ll bag = 0;
                // // //cout << "Rider = " << i << "\n";
                for (auto x : ans2[i])
                {
                    bag += itemSizes[x];
                    // // //cout << x << " ";
                    // // //cout << "/" << dis[0][x] << "/" << times[x] << "/";
                    if (x != 0)
                        count1++;
                    // count11+=itemSizes[i];
                }
                // // //cout << "    " << bag;
                // // //cout<<" "<<riderBags[i]<<" ";
                // // //cout << "\n";
            }
            // // //cout << count1;
            // // //cout << "\t\t";

            if (checker.first == 1 && checker.second == count1)
            {
                record_all_answers.push_back({count1, ans2});
            }

            // // //cout << endl;
        }
    }
// return timepass_array;
    vector<vector<vector<int>>> clustering_list1;

    // vector<vector<int>> take_all_in_one_vector1 = take_all_in_one(dis, min(numRiders,numLocations), numLocations);
    // clustering_list1.push_back(take_all_in_one_vector1);

    // vector<vector<int>> trial_round_vector1 = trial_round(dis, min(numRiders,numLocations), numLocations);
    // clustering_list1.push_back(trial_round_vector1);

    vector<vector<int>> KMeansClustering1_vector = KMeansClustering(dis, min(numRiders,numLocations), numLocations);
    clustering_list1.push_back(KMeansClustering1_vector);

    // vector<vector<int>> random_clustering_vector1 = random_clustering(dis, min(numRiders,numLocations), numLocations);
    // clustering_list1.push_back(random_clustering_vector1);

    // vector<vector<int>> KMeansClustering_latlong_vector1 = KMeansClustering_latlong(coordinates,min(numRiders,numLocations),numLocations);
    // clustering_list.push_back(KMeansClustering_latlong_vector1);

    vector<vector<int>> GivenLocationClustering_vector1 = GivenLocationClustering(dis, numLocations, area);
    clustering_list1.push_back(GivenLocationClustering_vector1);

    int variab = min(numRiders,numLocations);
    vector<vector<int>> density_based_clustering1 = Scan(dis,variab);
    clustering_list1.push_back(density_based_clustering1);

    for (auto clustering_algorithm : clustering_list1)
    {
        // // //cout << "\n";
        for (int iter = 0; iter < all_answers; iter++)
        {
            // // //cout << "\n";z

            vector<vector<int>> ans2(numRiders);

            // if(iter==0)// //cout << "Jaskaran Ans"<< "\t\t\t\t";
            // if(iter==1)// //cout << "Mayank Ans"<< "\t\t\t\t\t";
            // if(iter==2)// //cout << "Mayank second Ans"<< "\t\t\t";
            // if(iter==3)// //cout << "Abhishek Ans"<< "\t\t\t\t";
            // if(iter==4)// //cout << "Saurabh Ans"<< "\t\t\t\t\t";
            // if(iter==5)// //cout << "Saurabh second Ans"<< "\t\t\t";

            int total_riders = 0;
            int total_riders1 = 0;

            int it = 0;
            vector<int> riders_list(clustering_algorithm.size());

            for (int i = 0; i < clustering_algorithm.size(); i++)
            {
                riders_list[i] = 1;
            }

            for (auto list : clustering_algorithm)
            {
                int deliveries = list.size();
                if(deliveries==0)continue;
                reverse(list.begin(), list.end());
                list.push_back(0);
                reverse(list.begin(), list.end());
                vector<vector<int>> adjancy_matrix(deliveries + 1, vector<int>(deliveries + 1));

                for (int i = 0; i <= deliveries; i++)
                {
                    for (int j = 0; j <= deliveries; j++)
                    {
                        adjancy_matrix[i][j] = dis[list[i]][list[j]];
                    }
                }

                vector<int> endOfDelivery(deliveries + 1);
                vector<int> package_volume(deliveries + 1);
                for (int i = 0; i <= deliveries; i++)
                {
                    endOfDelivery[i] = times[list[i]];
                    package_volume[i] = itemSizes[list[i]];
                }

                int ridersTaken = riders_list[it];
                if(ridersTaken==0)
                {
                    continue;
                }
                // // //cout<<ridersTaken<<" \n";
                it++;
                vector<int> bagSize(ridersTaken);
                for (int i = 0; i < ridersTaken; i++)
                {
                    bagSize[i] = riderBags[i + total_riders];
                }

                //                     (vector<vector<int>> &adjancy_matrix,
                //                                             int numRiders, vector<int> &endOfDelivery, vector<int> &bagSize, vector<int> &package_volume)
                // {

                vector<vector<int>> ans3;
                if (iter == 0)
                {
                    ans3 = dp_on_EOD_and_lastrider(adjancy_matrix, ridersTaken, endOfDelivery, bagSize, package_volume, reach_hub_before_this_time);
                }
                if (iter == 1)
                {
                    ans3 = delivering_based_on_End_of_Delivery_Time__Mainfunction(adjancy_matrix, ridersTaken,
                                                                                  endOfDelivery, bagSize, package_volume, reach_hub_before_this_time);
                }
                if (iter == 2)
                {
                    ans3 = delivering_based_on_End_of_Delivery_Time__Mainfunction2(adjancy_matrix, ridersTaken,
                                                                                   endOfDelivery, bagSize, package_volume, reach_hub_before_this_time);
                }
                if (iter == 3)
                {
                }
                if (iter == 4)
                {
                    ans3 = delivering_object_nearest1(adjancy_matrix, ridersTaken,
                                                      endOfDelivery, bagSize, package_volume, reach_hub_before_this_time);
                }
                if (iter == 5)
                {
                    ans3 = delivering_object_nearest_in_cyclic1(adjancy_matrix, ridersTaken,
                                                                endOfDelivery, bagSize, package_volume, reach_hub_before_this_time);
                }

                for (int i = 0; i < ans3.size(); i++)
                {
                    for (auto x : ans3[i])
                    {
                        ans2[total_riders + i].push_back(list[x]);
                    }
                }

                total_riders += ridersTaken;
            }

            auto checker = goodSolution(numRiders, dis, numLocations, times, riderBags, itemSizes, ans2, reach_hub_before_this_time);
            // // //cout << checker.first << " " << checker.second << " ";

            int count1 = 0;
            for (int i = 0; i < numRiders; i++)
            {
                ll bag = 0;
                // // //cout << "Rider = " << i << "\n";
                for (auto x : ans2[i])
                {
                    bag += itemSizes[x];
                    // // //cout << x << " ";
                    // // //cout << "/" << dis[0][x] << "/" << times[x] << "/";
                    if (x != 0)
                        count1++;
                    // count11+=itemSizes[i];
                }
                // // //cout << "    " << bag;
                // // //cout<<" "<<riderBags[i]<<" ";
                // // //cout << "\n";
            }
            // // //cout << count1;
            // // //cout << "\t\t";

            if (checker.first == 1 && checker.second == count1)
            {
                record_all_answers.push_back({count1, ans2});
            }

            // // //cout << endl;
        }
    }


// return timepass_array;
    // Jaskaran Ans
    // // //cout << "\n\n\n";
    // // //cout << "\n";
    // // //cout << "\n";
    // // //cout << "Jaskaran Ans"<< "\t\t\t\t";
    auto ans2 = dp_on_EOD_and_lastrider(dis, ridersToAssign, times, riderBags, itemSizes, reach_hub_before_this_time);
    auto checker = goodSolution(numRiders, dis, numLocations, times, riderBags, itemSizes, ans2, reach_hub_before_this_time);
    // // //cout << checker.first << " " << checker.second << " ";
    int count1 = 0;
    for (int i = 0; i < numRiders; i++)
    {
        ll bag = 0;
        // // //cout << "Rider = " << i << "\n";
        for (auto x : ans2[i])
        {
            bag += itemSizes[x];
            // // //cout << x << " ";
            // // //cout << "/" << dis[0][x] << "/" << times[x] << "/";
            if (x != 0)
                count1++;
            // count11+=itemSizes[i];
        }
        // // //cout << "    " << bag;
        // // //cout << "\n";
    }
    // // //cout << count1;

    if (checker.first == 1 && checker.second == count1)
    {
        record_all_answers.push_back({count1, ans2});
    }
//     // // //cout << endl;
//     // // //cout << "\t\t";

    // Mayank Ans
    int count = 0;
    auto ans = delivering_based_on_End_of_Delivery_Time__Mainfunction(dis, ridersToAssign, times, riderBags, itemSizes, reach_hub_before_this_time);
    // // //cout << "Mayank Ans"
    //      << "\t\t\t\t\t";
    checker = goodSolution(numRiders, dis, numLocations, times, riderBags, itemSizes, ans, reach_hub_before_this_time);
    // // //cout << checker.first << " " << checker.second << " ";

    for (int i = 0; i < numRiders; ++i)
    {
        // // //cout << "Rider = " << i << "\n";
        ll bag = 0;
        for (int l : ans[i])
        {
            bag += itemSizes[l];
            // // //cout << l << ' ';
            if (l != 0)
                count++;
        }
        // // //cout << "    " << bag << " " << riderBags[i];
        // // //cout << "\n";
    }
    // // //cout << count << "\t\t";

    if (checker.first == 1 && checker.second == count)
    {
        record_all_answers.push_back({count, ans});
    }

//     // // //cout << endl;

    // Mayank_2 Ans
    count = 0;
    ans = delivering_based_on_End_of_Delivery_Time__Mainfunction2(dis, ridersToAssign, times, riderBags, itemSizes, reach_hub_before_this_time);
    // // //cout << "Mayank second Ans"
    // << " \t\t\t";
    checker = goodSolution(numRiders, dis, numLocations, times, riderBags, itemSizes, ans, reach_hub_before_this_time);
    // // //cout << checker.first << " " << checker.second << " ";

    for (int i = 0; i < numRiders; ++i)
    {
        // // //cout << "Rider = " << i << "\n";
        ll bag = 0;
        for (int l : ans[i])
        {
            bag += itemSizes[l];
            // // //cout << l << ' ';
            if (l != 0)
                count++;
        }
        // // //cout << "    " << bag << " " << riderBags[i];
        // // //cout << "\n";
    }
    // // //cout << count << "\t\t";

    if (checker.first == 1 && checker.second == count)
    {
        record_all_answers.push_back({count, ans});
    }
    // // //cout << endl;

    // Abhishek Ans
    // // //cout << "Abhishek Ans"
    // << "\t\t\t\t";
    auto abhishek_ans = getRidersAssignment(ridersToAssign, dis, loc, numLocations, times, riderBags, itemSizes);
    checker = goodSolution(numRiders, dis, numLocations, times, riderBags, itemSizes, abhishek_ans, reach_hub_before_this_time);
    // // //cout << checker.first << " " << checker.second << " ";
    count1 = 0;
    for (int i = 0; i < numRiders; i++)
    {
        // // //cout << "Rider = " << i << "\n";
        for (auto x : abhishek_ans[i])
        {
            // // //cout << x << " ";
            if (x != 0)
                count1++;
            // count11+=itemSizes[i];
        }
        // // //cout << "\n";
    }
    // // //cout << count1;
    if (checker.first == 1 && checker.second == count1)
    {
        record_all_answers.push_back({count1, abhishek_ans});
    }

    // // //cout << "\t\t";
    // // //cout << endl;

    // Saurabh Ans
    // // //cout << "Saurabh Ans"
    // << " \t\t\t\t";
    auto saurabh_ans = delivering_object_nearest1(dis, numRiders, times, riderBags, itemSizes, reach_hub_before_this_time);
    // getRidersAssignment(ridersToAssign, dis, loc, numLocations, times, riderBags, itemSizes);
    if(saurabh_ans.size()<numRiders)
    {
        saurabh_ans = timepass_array;
    }
    checker = goodSolution(numRiders, dis, numLocations, times, riderBags, itemSizes, saurabh_ans, reach_hub_before_this_time);
    // // //cout << checker.first << " " << checker.second << " ";
    count1 = 0;
    for (int i = 0; i < numRiders; i++)
    {
        // // //cout << "Rider = " << i << "\n";
        int bag = 0;
        for (auto x : saurabh_ans[i])
        {
            bag += itemSizes[x];
            // // //cout << x << " ";
            if (x != 0)
                count1++;
            // count11+=itemSizes[i];
        }
        // // //cout << "    " << bag << " " << riderBags[i];
        // // //cout << "\n";
    }
    // // //cout << count1;

    if (checker.first == 1 && checker.second == count1)
    {
        record_all_answers.push_back({count1, saurabh_ans});
    }
    // // //cout << endl;
    // // //cout << "\t\t";

    // Saurabh second  Ans
    // // //cout << "Saurabh second Ans"
    // << " \t\t\t";
    auto saurabh_second_ans = delivering_object_nearest_in_cyclic1(dis, numRiders, times, riderBags, itemSizes, reach_hub_before_this_time);
    // getRidersAssignment(ridersToAssign, dis, loc, numLocations, times, riderBags, itemSizes);
    if(saurabh_second_ans.size()<numRiders)
    {
        saurabh_second_ans = timepass_array;
    }
    checker = goodSolution(numRiders, dis, numLocations, times, riderBags, itemSizes, saurabh_second_ans, reach_hub_before_this_time);
    // // //cout << checker.first << " " << checker.second << " ";
    count1 = 0;
    for (int i = 0; i < numRiders; i++)
    {
        // // //cout << "Rider = " << i << "\n";
        int bag = 0;
        for (auto x : saurabh_second_ans[i])
        {
            bag += itemSizes[x];
            // // //cout << x << " ";
            if (x != 0)
                count1++;
            // count11+=itemSizes[i];
        }
        // // //cout << "    " << bag << " " << riderBags[i];
        // // //cout << "\n";
    }
    // // //cout << count1;

    if (checker.first == 1 && checker.second == count1)
    {
        record_all_answers.push_back({count1, saurabh_second_ans});
    }

    
    
    // return list_final_answers[0].second;

    // vector<vector<int>> dist = delivering_object_using_genetic_algorithm(dis,  numRiders, times, riderBags, itemSizes, reach_hub_before_this_time);
    // // //cout<<dist.size()<<"\n";
    // for(auto x:dist)
    // {
    //     for(auto y:x)
    //     {
    //         // //cout<<y<<" ";
    //     }
    //     // //cout<<"\n";
    // }
    // // //cout << "\n\n";




    int finding_total_sum = 0;
    int finding_total_maximum = 0;
    // for (auto x11 : record_all_answers)
    // {
    //     finding_total_sum++;

    //     checker = goodSolution(numRiders, dis, numLocations, times, riderBags, itemSizes, x11.second, reach_hub_before_this_time);
    //     // //cout << checker.first << " " << checker.second << " ";
    //     count1 = 0;
    //     for (int i = 0; i < numRiders; i++)
    //     {
    //         // // //cout << "Rider = " << i << "\n";
    //         int bag = 0;
    //         for (auto x : x11.second[i])
    //         {
    //             bag += itemSizes[x];
    //             // // //cout << x << " ";
    //             if (x != 0)
    //                 count1++;
    //             // count11+=itemSizes[i];
    //         }
    //         // // //cout << "    " << bag << " " << riderBags[i];
    //         // // //cout << "\n";
    //     }
    //     // //cout << count1 << "     ";

    //     if (finding_total_sum % 6 == 0)
    //         // //cout << "\n";

    //     finding_total_maximum = max(finding_total_maximum, count1);
    //     // break;
    // }
    // // //cout << "\n";
    // // //cout << finding_total_maximum << "\n\n\n";


    // return record_all_answers[0].second;

    auto saurabh_genetic_ans = delivering_object_using_genetic_algorithm(dis, numRiders, times, riderBags, itemSizes, reach_hub_before_this_time);
    // getRidersAssignment(ridersToAssign, dis, loc, numLocations, times, riderBags, itemSizes);\
    // if(saurabh_genetic_ans.size()<numRiders)
    // {
    //     saurabh_genetic_ans = timepass_array;
    // }
    checker = goodSolution(numRiders, dis, numLocations, times, riderBags, itemSizes, saurabh_genetic_ans, reach_hub_before_this_time);
    // // //cout << checker.first << " " << checker.second << " ";
    count1 = 0;
    for (int i = 0; i < numRiders; i++)
    {
        // // //cout << "Rider = " << i << "\n";
        int bag = 0;
        for (auto x : saurabh_genetic_ans[i])
        {
            bag += itemSizes[x];
            // // //cout << x << " ";
            if (x != 0)
                count1++;
            // count11+=itemSizes[i];
        }
        // // //cout << "    " << bag << " " << riderBags[i];
        // // //cout << "\n";
    }
    // // //cout << checker.first << " " << checker.second << " " << count1<<"\n\n";
    if (checker.first == 1 && checker.second == count1)
    {
        record_all_answers.push_back({count1, saurabh_genetic_ans});
    }




    int record_maximum = 0;
    for (auto x : record_all_answers)
    {
        record_maximum = max(record_maximum, x.first);
    }

    finding_total_sum = 0;
    finding_total_maximum = 0;
    vector<pair<int, vector<vector<int>>>> record_all_answers1;
    for (auto x11 : record_all_answers)
    {
        break;
        if(x11.first != record_maximum)
        {
            continue;
        }
        finding_total_sum++;

        auto saurabh_genetic_ans1 = delivering_object_using_genetic_algorithm111(dis, numRiders, times, riderBags, itemSizes, reach_hub_before_this_time, x11.second);
        // getRidersAssignment(ridersToAssign, dis, loc, numLocations, times, riderBags, itemSizes);
        checker = goodSolution(numRiders, dis, numLocations, times, riderBags, itemSizes, saurabh_genetic_ans1, reach_hub_before_this_time);
        // // //cout << checker.first << " " << checker.second << " ";
        count1 = 0;
        for (int i = 0; i < numRiders; i++)
        {
            // // //cout << "Rider = " << i << "\n";
            int bag = 0;
            for (auto x : saurabh_genetic_ans1[i])
            {
                bag += itemSizes[x];
                // // //cout << x << " ";
                if (x != 0)
                    count1++;
                // count11+=itemSizes[i];
            }
            // // //cout << "    " << bag << " " << riderBags[i];
            // // //cout << "\n";
        }
        // // //cout << count1 << "     ";

        // if (finding_total_sum % 6 == 0)
            // // //cout << "\n";
        if (checker.first == 1 && checker.second == count1)
        {
            record_all_answers1.push_back({count1,saurabh_genetic_ans1});
            finding_total_maximum = max(finding_total_maximum, count1);
        }

        
        // record_all_answers1.push_back({count1,saurabh_genetic_ans});

        // finding_total_maximum = max(finding_total_maximum, count1);
        // break;
    }
    // // //cout << "\n";
    // // //cout << finding_total_maximum << "\n";



    // int record_maximum = 0;
    // for (auto x : record_all_answers)
    // {
    //     record_maximum = max(record_maximum, x.first);
    // }
    // // //cout<<record_maximum<<"\n";
    for (auto x : record_all_answers1)
    {
        record_maximum = max(record_maximum, x.first);
    }
    // // //cout<<record_maximum<<"\n";


    vector<pair<int, vector<vector<int>>>> list_final_answers;
    for (auto x : record_all_answers)
    {
        if (x.first == record_maximum)
        {
            list_final_answers.push_back({1e9, x.second});
        }
    }
    for (auto x : record_all_answers1)
    {
        if (x.first == record_maximum)
        {
            list_final_answers.push_back({1e9, x.second});
        }
    }

    vector<vector<int>> returning(numRiders);

    if(list_final_answers.size()==0)
    {
        return returning;
    }
    //cout<<"123123";
    return list_final_answers[0].second;
}


int main()
{
    srand(time(0));

    startTime = clock();
    int T = 1;

    while (T--)
    {
        
        int num_items;
        cin>>num_items;
        // num_items = 2000;

        vector<vector<int>> time_adj(num_items + 1, vector<int> (num_items + 1,0));
        
        for (int i = 0; i <= num_items; ++i) {
            for (int j = 0; j <= num_items; ++j) {
                cin>>time_adj[i][j];
                // if(i!=j)
                // {
                //     time_adj[i][j]=rand(30,150);
                // }
            }
        }

        vector<int> item_volumes(num_items+1);
        for(int i=1; i <= num_items; ++i) {
            cin>>item_volumes[i];
            // item_volumes[i]=rand(10,50);
        }

        vector<int> edd(num_items+1);
        for(int i=1; i <= num_items; ++i) {
            cin>>edd[i];
            // edd[i]=46800;
        }

        vector<pair<double,double>> coordinates(num_items+1);
        for(int i=0; i<=num_items; ++i) { 
            cin>>coordinates[i].first>>coordinates[i].second;
        }

        vector<int> area(num_items+1,0);
        for(int i=0; i<=num_items; ++i) {
            cin>>area[i];
            // area[i]=1;
        }

        int num_riders;
        cin>>num_riders;
        // num_riders = 100;

        vector<int> bag_volumes(num_riders);
        for(int i=0; i< num_riders; ++i) {
            cin>>bag_volumes[i];
            // bag_volumes[i]=rand(200,1000);
        }

        int reach_hub_before_this_time = 46800;

        vector<vector<int>> result(num_riders);
        result = solve(num_items, time_adj, item_volumes, edd, coordinates, area, num_riders, bag_volumes, reach_hub_before_this_time);
        
        for(int i=0; i<num_riders; ++i)
        {
            if(result[i].size()==0){std::cout<<-1<<"\n"; continue;}

            for(auto loc : result[i]){std::cout<<loc<<"\n";} 
            std::cout<<-1<<"\n";
        }
    }
    
    return 0;
}

