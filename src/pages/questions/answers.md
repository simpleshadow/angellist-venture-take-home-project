### Discovering a bug

> Suppose we discover a bug with our algorithm and investors for two deals had incorrect allocations. This means that some of the investors ended up investing more than they were allowed to while others invested less than they were allowed to. One of deals happened two years ago and the other one happened two weeks ago. Please describe, in detail, how would you go about correcting this  issue and how would you communicate this to the affected customers.

Immediate concerns:

1. Contact Legal to see if there are any immediate unknown legal concerns or issues that need to be addressed.
2. Contact Finance to see if there are any immediate unknown financial concerns or issues that need to be addressed. 
3. Contact the reporter(s) of the issue to document steps where bug was discovered.
4. Contact Engineering / QA to determine if this is a known issue or related / associated code changes.
5. Create placeholder issue to ensure known details of bug are centralized (and not forgotten) and so an estimate of the effort to resolve can be made.
6. Contact Lead / Team and provide issue to determine a severity, impact, and priority of resolving the issue.
7. Contact the impacted parties to inform them of the occurence and date of issue, the impact and severity, and ensuring that you will provide a resolution timeline within 24 hours and are open to any questions or concerns they may have.

If priority, investigate, reproduce, and resolve:

1. Isolate inputs — determine sources used as inputs to the allocator calculation (e.g. services and database that provide the historical investment average that's used to calculate investor allocation proration).
2. Were their any system changes, deployments, or security issues around the dates of these reported issues? Were they specific to the impacted parties?
3. Check to see if their are unit tests for the related issue code. If not, write tests. Test(s) should validate (a) historical average value retrieved from databse is the value in the database (b) sum of investments is less than or equal to the allocation amount (c) requested investment is less than or equal to the historical average investments if total request exceeds allocation (d) historical average for investors are being calculated correctly and is the value stored in the database.
4. Attempt to reproduce with what's known from investigation.
5. If can reproduce, begin necessary development to resolution.
6. Ask Engineering / QA to assist in code review and testing.
7. Merge and ship it.
8. Meet with Lead to generate resolution to impacted parties.
9. Write resolution report for Team and solicit any other feedback, concerns, and necssary steps to prevent issue in future.

&nbsp;  
&nbsp;  
&nbsp;  

### Squeezed down

> An angry investor sent us a note about how they keep getting squeezed down to $25K per deal even though their requested amount is $100K. Underneath the hood, this was because there's limited allocation (low supply) and a high volume of investors looking to invest (high demand). How should we communicate this to an investor in a way that minimizes the damage to our relationship with the investor? In addition, can you think of a better way we could change the proration basis logic so that this could potentially happen less often?

#### Angry Investor

Based on the investor feedback, the product is not meeting their expectations either because (a) the product does not communicate and set expectations appropriately (b) the product is not delivering the value expected or (c) the investor has unrealistic expectations and an effort to understand those expectations needs to be made.

1. Would be wise to reach out to angry investor and ask for their expert opinion ([Mom Test](http://momtestbook.com/)) to glean any potential improvements to the product and truly understand their workflow (e.g. maybe they are regularly making small investments that are causing them to be squeezed out and impacting their ability to make the occasional larger investment).
2. It may help to indicate the overall supply and demand — available allocation of a particular deal and the leverage other investors in the deal have (so expectations are appropriately set).
2. Also, if not already done so, it would be wise to provide a simple (as possible) explanation for how deals are allocated / prorated on the investor facing page (e.g. larger ).

#### Improved Proration

I will say, using the average investment as the basis for proration did seem a bit odd to me as it certainly could cause the above issue where an investor wants to finally make a larger investment on a hot deal.

To deliver value to investors, I assume they want to (a) see a satisfying return on their investments (b) get into as many good deals as possible.

Perhaps a "first come, first serve" approach could be made (like exchanges) where first movers are able to either allocate as much as they wish or are given more availbe leverage given they are taking a risk as a first mover.

Similarly, prehaps frequency of investment (and not amount) should be incorparted as a multiplier of possible leverage an active investor has. This would help to address the desire to get a better position on deals for active investors when they are more actively pursuing deals.

Also, it is the ultimately the startup who is benefiting from that investor, so it does seem their input should be incorporated into deal allocation. Perhaps investors can receive quality scores based on ratings from startups that are incorporated into the allocation. Additionally, more controls could be given to the startups to manually set investor allocations that investors could accept.