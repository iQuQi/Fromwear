
import * as React from 'react';
import {Component} from 'react';
import { ListItem, Stack } from '@mui/material';
import './SearchPage.css'
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { TagRankData as tag_rank_data } from './TagData'; 

let RankTag = ({is_tag_more,handle_rank_tag_button_click,target_button})=>
    is_tag_more?
    <Stack direction="row">
        <ul className="rank_tag_list">
         {tag_rank_data.map((data,index) =>
                    <li>
                        <Button key={data} 
                            style={{minWidth: 80,height: 40,marginBottom:10,marginRight:10,fontSize: 13, 
                            color: target_button[index]==0?"black":"white", backgroundColor: target_button[index]==0?"#e7e6d2":"black", borderRadius: "30px",boxShadow:"0 0 0 0"}} 
                            variant="contained"
                            onClick={handle_rank_tag_button_click}
                            value={index} 
                        >
                            {data}
                        </Button>
                    </li>
      
         )}
         </ul>
    </Stack>
    :<br/>
;
            
         
export default RankTag;
    