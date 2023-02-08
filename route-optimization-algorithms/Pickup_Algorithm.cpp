#include <iostream>
#include<vector>
#include<cstdlib>
#include<ctime>
using namespace std;

pair<int, int> getAns(int current_time,int item_volume,int item_entry_time,int num_riders,
                    vector<int>&bag_volume,vector<int>&first_task_time,vector<vector<vector<int>>>&tasks_old,
                    int&reach_hub_before_this_time)
{
    vector<vector<int>> time_required(num_riders);

    vector<vector<vector<int>>> tasks = tasks_old;
    for(int i=0; i<num_riders ;i++)
    {
        tasks[i][0][3] = first_task_time[i];
        for(int j=1;j<tasks[i].size();j++)
        {
            tasks[i][j][3] = tasks_old[i][j-1][3];
        }
    }

    for (int i = 0; i < num_riders; i++)
    {
        int siz = tasks[i].size();
        vector<int> arr(siz, 1e9);

        if ((item_volume) > bag_volume[i])
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
            int mini_dis = 1e9;
            int volume_used = 0;
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

    return {ans1, ans2-1};
}


int main ()
{
    srand(time(0));
    
    int current_time;
    cin>>current_time;

    int item_volume;
    cin>>item_volume;

    int item_entry_time;
    cin>>item_entry_time;

    int num_riders;
    cin>>num_riders;

    vector<int> bag_volume(num_riders);
    for(int i=0; i<num_riders; i++){cin>>bag_volume[i];}

    vector<int> first_task_time(num_riders);
    vector<vector<vector<int>>> tasks(num_riders);

    int reach_hub_before_this_time = 48600;

    for(int i=0; i<num_riders; i++)
    {
        int num_tasks;
        cin>>num_tasks;

        cin>>first_task_time[i];

        while(num_tasks--)
        {
            int item_volume , task_type , edd , time_next , time_from_pickup;

            cin>>item_volume; //item volume of that task
            cin>>task_type; //0 for delivery , 1 for pickup
            cin>>edd; //expected delivery deadline if task is a delivery
            cin>>time_next; //time to next task, -1 for last task
            cin>>time_from_pickup; //time from pickup point

            tasks[i].push_back({item_volume,task_type,edd,time_next,time_from_pickup});
        }
    }

    pair<int,int> res = getAns(current_time,item_volume,item_entry_time,num_riders,bag_volume,first_task_time,tasks,reach_hub_before_this_time);

    std::cout<<res.first<<"\n";
    std::cout<<res.second<<"\n";

    return 0;
}