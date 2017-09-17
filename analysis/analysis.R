# Potato Game Behavioural Analysis
# Eric Schulz & Maarten Speekenbrink 
# 25-31 August 2017

#required packages packages
packages <- c('ggplot2', 'plyr', 'jsonlite', 'lme4', 'lsmeans', 'grid', 'gridExtra', 'png')

#load them
lapply(packages, library, character.only = TRUE)

## Loading required package: Matrix

## Loading required package: estimability

## [[1]]
## [1] "ggplot2"   "stats"     "graphics"  "grDevices" "utils"     "datasets" 
## [7] "methods"   "base"     
## 
## [[2]]
## [1] "plyr"      "ggplot2"   "stats"     "graphics"  "grDevices" "utils"    
## [7] "datasets"  "methods"   "base"     
## 
## [[3]]
##  [1] "jsonlite"  "plyr"      "ggplot2"   "stats"     "graphics" 
##  [6] "grDevices" "utils"     "datasets"  "methods"   "base"     
## 
## [[4]]
##  [1] "lme4"      "Matrix"    "jsonlite"  "plyr"      "ggplot2"  
##  [6] "stats"     "graphics"  "grDevices" "utils"     "datasets" 
## [11] "methods"   "base"     
## 
## [[5]]
##  [1] "lsmeans"      "estimability" "lme4"         "Matrix"      
##  [5] "jsonlite"     "plyr"         "ggplot2"      "stats"       
##  [9] "graphics"     "grDevices"    "utils"        "datasets"    
## [13] "methods"      "base"        
## 
## [[6]]
##  [1] "grid"         "lsmeans"      "estimability" "lme4"        
##  [5] "Matrix"       "jsonlite"     "plyr"         "ggplot2"     
##  [9] "stats"        "graphics"     "grDevices"    "utils"       
## [13] "datasets"     "methods"      "base"        
## 
## [[7]]
##  [1] "gridExtra"    "grid"         "lsmeans"      "estimability"
##  [5] "lme4"         "Matrix"       "jsonlite"     "plyr"        
##  [9] "ggplot2"      "stats"        "graphics"     "grDevices"   
## [13] "utils"        "datasets"     "methods"      "base"        
## 
## [[8]]
##  [1] "png"          "gridExtra"    "grid"         "lsmeans"     
##  [5] "estimability" "lme4"         "Matrix"       "jsonlite"    
##  [9] "plyr"         "ggplot2"      "stats"        "graphics"    
## [13] "grDevices"    "utils"        "datasets"     "methods"     
## [17] "base"

#path of where the jsons files are
#foldername<-"https://rawgit.com/moritzkrusche/CoDeS-Project/master/data/JSON/"
foldername<-"/home/maarten/MEGA/MSc Projects/Moritz Krusche/Data/JSON/"


#difference function, we'll need this to get the pay-off per move as they've been saved 
mydiff<-function(x){
  y<-x
  for (i in 2:length(x)){
    #difference to previous entry
    y[i]<-y[i]-x[i-1]
  }
  return(y)
}

#standard error, we'll need that for the error bars
se<-function(x){sd(x)/sqrt(length(x))}

# !Score over blocks!

#168 particitipants in total
idnum<-168

#getting the right format for the way the json's are named
#format<-formatC(format="d", 1:idnum, flag="0", width=ceiling(log10(max(idnum))))

#initialize empty data frame
dat<-data.frame(id=numeric(), condition=numeric(), block=numeric(), payoff=numeric())

#loop through the json files
for (i in 1:idnum){
  #get individual json
  myjson<-fromJSON(paste0(foldername, "ppt", i, ".json"))
  #payoff per block
  payoff<-mydiff(as.numeric(unlist(myjson$allPayoffCounts)))[1:5]
  #condition
  condition<-rep(myjson$condition, 5)
  #block number
  block<-1:5
  #participant's id
  id<-rep(i, 5)
  #dummy frame
  dummy<-data.frame(id, condition, block, payoff)
  #attach to main frame
  dat<-rbind(dat, dummy)
}
#recode conditions
dat$cond<-mapvalues(dat$condition, 1:4, c("1-2", "1-2", "0.5-0.5", "0.5-0.5"))
dat$ori <-mapvalues(dat$condition, 1:4, c("soil-col", "plant-col", "soil-col", "plant-col"))

#create a frame for plotting with means and standard errors per block and condition
dplot<-ddply(dat, ~cond+block, summarize, mu=mean(payoff), se=se(payoff))
#change condition to factor for plotting and type consitency
dplot$cond<-as.factor(dplot$cond)
#set limits
limits <- aes(ymax = mu + se, ymin=mu - se)

#dodge bars a little
pd <- position_dodge(.2)

#plot the means over blocks and condition
p<-ggplot(dplot, aes(x=block, y=mu, col=cond)) +
  #error bars
  geom_errorbar(aes(ymin=mu-se, ymax=mu+se), width=0.2, size=1, position=pd) +
  #lines
  geom_line(position=pd, size=1) +
  #classic theme, legend on bottom
  theme_classic()+theme(text = element_text(size=22,  family="serif"), legend.position="bottom")+
  ylab("Mean outcome")+xlab("Block")+
  guides(col=guide_legend(title="Condition (beta distribution)"))+
  #adjust text size
  theme(panel.background = element_blank(),
        panel.grid.major = element_blank(), 
        panel.grid.minor = element_blank(),
        axis.line = element_line(colour = "black"),
        panel.border = element_rect(colour = "black", fill=NA, size=2))
#show plot
print(p)

#create a frame for plotting with means and standard errors per block and condition
dplot<-ddply(dat, ~cond+ori+block, summarize, mu=mean(payoff), se=se(payoff))
#change condition to factor for plotting and type consitency
dplot$cond<-as.factor(dplot$cond)
dplot$ori<-as.factor(dplot$ori)
#set limits
limits <- aes(ymax = mu + se, ymin=mu - se)

#dodge bars a little
pd <- position_dodge(.2)

#plot the means over blocks and condition
p<-ggplot(dplot, aes(x=block, y=mu, col=cond)) +
  #error bars
  geom_errorbar(aes(ymin=mu-se, ymax=mu+se), width=0.2, size=1, position=pd) +
  #lines
  geom_line(position=pd, size=1) +
  #classic theme, legend on bottom
  theme_classic()+theme(text = element_text(size=22,  family="serif"), legend.position="bottom")+
  ylab("Mean outcome")+xlab("Block")+
  guides(col=guide_legend(title="Condition (beta distribution)")) +
  facet_wrap(~ori) +
  #adjust text size
  theme(panel.background = element_blank(),
        panel.grid.major = element_blank(), 
        panel.grid.minor = element_blank(),
        axis.line = element_line(colour = "black"),
        panel.border = element_rect(colour = "black", fill=NA, size=2))
#show plot
print(p)

library(lmerTest)

## 
## Attaching package: 'lmerTest'

## The following object is masked from 'package:lsmeans':
## 
##     lsmeans

## The following object is masked from 'package:lme4':
## 
##     lmer

## The following object is masked from 'package:stats':
## 
##     step

dat$cond <- as.factor(dat$cond)
# use an orthogonal contrast code for condition (-1 for 1-2, 1 for 05-05 I think)
contrasts(dat$cond) <- c(-1,1)
#mixed effects with blocks nested within participants
m<-lmer(payoff~block*cond+(block|id), data=dat)
#summary, this is where we look at the fixed effects
summary(m)

## Linear mixed model fit by REML t-tests use Satterthwaite approximations
##   to degrees of freedom [lmerMod]
## Formula: payoff ~ block * cond + (block | id)
##    Data: dat
## 
## REML criterion at convergence: -1461.4
## 
## Scaled residuals: 
##     Min      1Q  Median      3Q     Max 
## -2.6741 -0.6518 -0.0661  0.5940  4.5989 
## 
## Random effects:
##  Groups   Name        Variance  Std.Dev. Corr 
##  id       (Intercept) 0.0016363 0.04045       
##           block       0.0001624 0.01274  -0.74
##  Residual             0.0088469 0.09406       
## Number of obs: 840, groups:  id, 168
## 
## Fixed effects:
##               Estimate Std. Error         df t value Pr(>|t|)    
## (Intercept)   0.262548   0.008226 166.000000  31.917  < 2e-16 ***
## block         0.008570   0.002497 166.000000   3.433 0.000755 ***
## cond1        -0.019978   0.008226 166.000000  -2.429 0.016221 *  
## block:cond1   0.002209   0.002497 166.000000   0.885 0.377566    
## ---
## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
## 
## Correlation of Fixed Effects:
##             (Intr) block  cond1 
## block       -0.880              
## cond1        0.000  0.000       
## block:cond1  0.000  0.000 -0.880

dat$ori <- as.factor(dat$ori)
# use an orthogonal contrast code for orientation
contrasts(dat$ori) <- c(-1,1)
# "center" block
dat$block <- dat$block - 3
# mixed effects with blocks (as metric) nested within participants. Block is metric variable, condition and orientation are factors and contrast coded (orthogonal contrast codes)
m<-lmer(payoff~block*cond*ori+(block|id), data=dat)
#summary, this is where we look at the fixed effects
summary(m)

## Linear mixed model fit by REML t-tests use Satterthwaite approximations
##   to degrees of freedom [lmerMod]
## Formula: payoff ~ block * cond * ori + (block | id)
##    Data: dat
## 
## REML criterion at convergence: -1427.4
## 
## Scaled residuals: 
##     Min      1Q  Median      3Q     Max 
## -2.6446 -0.6493 -0.0768  0.5895  4.5025 
## 
## Random effects:
##  Groups   Name        Variance  Std.Dev. Corr
##  id       (Intercept) 0.0007742 0.02782      
##           block       0.0001747 0.01322  0.31
##  Residual             0.0088469 0.09406      
## Number of obs: 840, groups:  id, 168
## 
## Fixed effects:
##                    Estimate Std. Error         df t value Pr(>|t|)    
## (Intercept)       2.884e-01  3.892e-03  1.640e+02  74.106  < 2e-16 ***
## block             8.560e-03  2.512e-03  1.640e+02   3.408 0.000823 ***
## cond1            -1.322e-02  3.892e-03  1.640e+02  -3.396 0.000858 ***
## ori1             -4.278e-03  3.892e-03  1.640e+02  -1.099 0.273255    
## block:cond1       2.199e-03  2.512e-03  1.640e+02   0.876 0.382538    
## block:ori1        1.831e-04  2.512e-03  1.640e+02   0.073 0.941963    
## cond1:ori1       -7.184e-03  3.892e-03  1.640e+02  -1.846 0.066696 .  
## block:cond1:ori1  6.383e-04  2.512e-03  1.640e+02   0.254 0.799716    
## ---
## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
## 
## Correlation of Fixed Effects:
##             (Intr) block  cond1  ori1   blck:c1 blck:r1 cnd1:1
## block        0.069                                            
## cond1        0.000  0.000                                     
## ori1        -0.012 -0.001 -0.012                              
## block:cond1  0.000  0.000  0.069 -0.001                       
## block:ori1  -0.001 -0.012 -0.001  0.069 -0.012                
## cond1:ori1  -0.012 -0.001 -0.012  0.000 -0.001   0.000        
## blck:cnd1:1 -0.001 -0.012 -0.001  0.000 -0.012   0.000   0.069

dat$block <- dat$block + 3
tmp <- reshape(dat, idvar = c("id","condition","cond","ori"), timevar = "block", direction = "wide")
# write.csv(tmp,file="~/MEGA/MSc Projects/Moritz Krusche/Data/score_by_block.csv")
# RM ANOVA
library(car)
mod <- lm(cbind(payoff.1,payoff.2,payoff.3,payoff.4,payoff.5) ~ cond*ori,data=tmp)
idata <- data.frame(block=ordered(1:5))
av <- Anova(mod,idata=idata, idesign=~block,type=3) 
summary(av,multivariate=FALSE)

## 
## Univariate Type III Repeated-Measures ANOVA Assuming Sphericity
## 
##                    SS num Df Error SS den Df         F    Pr(>F)    
## (Intercept)    69.844      1   2.0858    164 5491.7138 < 2.2e-16 ***
## cond            0.147      1   2.0858    164   11.5316 0.0008584 ***
## ori             0.015      1   2.0858    164    1.2084 0.2732555    
## cond:ori        0.043      1   2.0858    164    3.4077 0.0666963 .  
## block           0.135      4   6.1537    656    3.5971 0.0065259 ** 
## cond:block      0.011      4   6.1537    656    0.2941 0.8818473    
## ori:block       0.016      4   6.1537    656    0.4323 0.7853357    
## cond:ori:block  0.012      4   6.1537    656    0.3315 0.8568349    
## ---
## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
## 
## 
## Mauchly Tests for Sphericity
## 
##                Test statistic p-value
## block                  0.9325 0.25248
## cond:block             0.9325 0.25248
## ori:block              0.9325 0.25248
## cond:ori:block         0.9325 0.25248
## 
## 
## Greenhouse-Geisser and Huynh-Feldt Corrections
##  for Departure from Sphericity
## 
##                 GG eps Pr(>F[GG])   
## block          0.96589   0.007205 **
## cond:block     0.96589   0.875983   
## ori:block      0.96589   0.778788   
## cond:ori:block 0.96589   0.850630   
## ---
## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
## 
##                   HF eps  Pr(>F[HF])
## block          0.9921032 0.006677137
## cond:block     0.9921032 0.880518966
## ori:block      0.9921032 0.783843832
## cond:ori:block 0.9921032 0.855426594

# !Score on Test maps!

#initialize empty data frame
dat<-data.frame(id=numeric(), condition=numeric(), payoff=numeric())
#loop through participants
for (i in 1:idnum){
  #get in json
  myjson<-fromJSON(paste0(foldername ,"ppt", i, ".json"))
  #get the scores by calculating the differences
  payoff<-mydiff(as.numeric(unlist(myjson$allPayoffCounts)))[6:13]
  #conditions
  condition<-rep(myjson$condition, 8)
  #running id number
  id<-rep(i, 8)
  #data frame
  dummy<-data.frame(id, condition, payoff)
  #bind them together
  dat<-rbind(dat, dummy)
}
#recode condition names
dat$cond<-mapvalues(dat$condition, 1:4, c("1-2", "1-2", "0.5-0.5", "0.5-0.5"))
dat$ori <-mapvalues(dat$condition, 1:4, c("soil-col", "plant-col", "soil-col", "plant-col"))

#a data frame for plotting
dplot<-ddply(dat, ~cond,summarize, mean=mean(payoff), se=se(payoff))
#limits
limits <- aes(ymax = mean + se, ymin=mean - se)

#do the plot
p <- ggplot(dplot, aes(y=mean, x=cond, fill=cond)) + 
  #bars
  geom_bar(position="dodge", stat="identity")+
  #golden ratio error bars
  geom_errorbar(limits, position="dodge", width=0.31)+
  #point size
  geom_point(size=3)+
  #labs
  xlab("Condition")+
  #classic theme
  theme_classic() +
  #adjust text size
  theme(text = element_text(size=22, family="serif"))+
  #adjust text size
  theme(panel.background = element_blank(),
        panel.grid.major = element_blank(), 
        panel.grid.minor = element_blank(),
        axis.line = element_line(colour = "black"),
        panel.border = element_rect(colour = "black", fill=NA, size=2))

print(p)

#a data frame for plotting
dplot<-ddply(dat, ~cond+ori,summarize, mean=mean(payoff), se=se(payoff))
#limits
limits <- aes(ymax = mean + se, ymin=mean - se)
pd <- position_dodge(.2)

#do the plot
p <- ggplot(dplot, aes(y=mean, x=cond, fill=ori)) + 
  #bars
  geom_bar(position="dodge", stat="identity")+
  #golden ratio error bars
  geom_errorbar(limits, position="dodge", width=0.31)+
  #point size
  geom_point(size=3, position="dodge")+
  #labs
  xlab("Condition")+
  #classic theme
  theme_classic() +
  #adjust text size
  theme(text = element_text(size=22, family="serif"))+
  #adjust text size
  theme(panel.background = element_blank(),
        panel.grid.major = element_blank(), 
        panel.grid.minor = element_blank(),
        axis.line = element_line(colour = "black"),
        panel.border = element_rect(colour = "black", fill=NA, size=2))

print(p)

dat$cond <- as.factor(dat$cond) 
contrasts(dat$cond) <- c(-1,1)
mod <- lmer(payoff~cond+(1|id),data=dat)
summary(mod)

## Linear mixed model fit by REML t-tests use Satterthwaite approximations
##   to degrees of freedom [lmerMod]
## Formula: payoff ~ cond + (1 | id)
##    Data: dat
## 
## REML criterion at convergence: -3760.4
## 
## Scaled residuals: 
##      Min       1Q   Median       3Q      Max 
## -2.52647 -0.68680  0.01832  0.70479  2.87488 
## 
## Random effects:
##  Groups   Name        Variance  Std.Dev.
##  id       (Intercept) 0.0003836 0.01958 
##  Residual             0.0032368 0.05689 
## Number of obs: 1344, groups:  id, 168
## 
## Fixed effects:
##               Estimate Std. Error         df t value Pr(>|t|)    
## (Intercept)  1.308e-01  2.166e-03  1.660e+02  60.392   <2e-16 ***
## cond1       -3.584e-05  2.166e-03  1.660e+02  -0.017    0.987    
## ---
## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
## 
## Correlation of Fixed Effects:
##       (Intr)
## cond1 0.000

dat$ori <- as.factor(dat$ori) 
contrasts(dat$ori) <- c(-1,1)
mod <- lmer(payoff~cond*ori+(1|id),data=dat)
summary(mod)

## Linear mixed model fit by REML t-tests use Satterthwaite approximations
##   to degrees of freedom [lmerMod]
## Formula: payoff ~ cond * ori + (1 | id)
##    Data: dat
## 
## REML criterion at convergence: -3739.9
## 
## Scaled residuals: 
##      Min       1Q   Median       3Q      Max 
## -2.51769 -0.69399  0.01186  0.70750  2.86286 
## 
## Random effects:
##  Groups   Name        Variance  Std.Dev.
##  id       (Intercept) 0.0003914 0.01978 
##  Residual             0.0032368 0.05689 
## Number of obs: 1344, groups:  id, 168
## 
## Fixed effects:
##               Estimate Std. Error         df t value Pr(>|t|)    
## (Intercept)  1.308e-01  2.177e-03  1.640e+02  60.092   <2e-16 ***
## cond1       -1.972e-05  2.177e-03  1.640e+02  -0.009    0.993    
## ori1        -5.333e-05  2.177e-03  1.640e+02  -0.024    0.980    
## cond1:ori1  -1.301e-03  2.177e-03  1.640e+02  -0.598    0.551    
## ---
## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
## 
## Correlation of Fixed Effects:
##            (Intr) cond1  ori1  
## cond1       0.000              
## ori1       -0.012 -0.012       
## cond1:ori1 -0.012 -0.012  0.000

#a function to keep track of dwelling
mydwelling<-function(x){
  #initialize at 0
  count<-1
  for (i in 2:length(x)){
    #count increments if movement has changed
    if (x[i]!=x[i-1]){count<-count+1}
  }
  return(count)
}

#initialize frame
dat<-data.frame(id=numeric(), condition=numeric(), dwell=numeric())

#loop through participants
for (i in 1:idnum){
  #get json
  myjson<-fromJSON(paste0(foldername, "ppt", i, ".json"))
  #dwell vector
  dwell<-rep(0, 5)
  #loop through open maps
  for (k in 1:5){
    #dwelling times
    dwell[k]<-mydwelling(unlist(myjson$allMovementTrackers[k]))
  }
  #condition
  condition<-rep(myjson$condition, 5)
  #id number
  id<-rep(i, 5)
  #block number
  block<-1:5
  #dummy frame
  dummy<-data.frame(id, condition, block, dwell)
  #attach
  dat<-rbind(dat, dummy)
}

#recode condition
dat$cond<-mapvalues(dat$condition, 1:4, c("1-2", "1-2", "0.5-0.5", "0.5-0.5"))
dat$ori <-mapvalues(dat$condition, 1:4, c("soil-col", "plant-col", "soil-col", "plant-col"))

#data frame for plotting
dplot<-ddply(dat, ~cond,summarize, mean=mean(dwell), se=se(dwell))
#do the plot
p <- ggplot(dplot, aes(y=mean, x=cond, fill=cond)) + 
  #bars
  geom_bar(position="dodge", stat="identity")+
  #golden ratio error bars
  geom_errorbar(limits, position="dodge", width=0.31)+
  #point size
  geom_point(size=3)+
  #title
  theme_classic() +
  #labs
  xlab("Condition")+ylab("Dwelling time")+
  #adjust text size
  theme(text = element_text(size=22, family="serif"))+
  #adjust theme
  theme(panel.background = element_blank(),
        panel.grid.major = element_blank(), 
        panel.grid.minor = element_blank(),
        axis.line = element_line(colour = "black"),
        panel.border = element_rect(colour = "black", fill=NA, size=2))
p

#data frame for plotting
dplot<-ddply(dat, ~cond+ori+block,summarize, mean=mean(dwell), se=se(dwell))
#dodge bars a little
pd <- position_dodge(.2)

#plot the means over blocks and condition
p<-ggplot(dplot, aes(x=block, y=mean, col=cond)) +
  #error bars
  geom_errorbar(aes(ymin=mean-se, ymax=mean+se), width=0.2, size=1, position=pd) +
  #lines
  geom_line(position=pd, size=1) +
  #classic theme, legend on bottom
  theme_classic()+theme(text = element_text(size=22,  family="serif"), legend.position="bottom")+
  ylab("Mean outcome")+xlab("Block")+
  guides(col=guide_legend(title="Condition (beta distribution)")) +
  facet_wrap(~ori) +
  #adjust text size
  theme(panel.background = element_blank(),
        panel.grid.major = element_blank(), 
        panel.grid.minor = element_blank(),
        axis.line = element_line(colour = "black"),
        panel.border = element_rect(colour = "black", fill=NA, size=2))
#show plot
print(p)

#just a normal regression, I know it's not great, but gives us an upper band of what's possible (kind of)
m<-lm(dwell~cond, data=dat)
#let's check
summary(m)

## 
## Call:
## lm(formula = dwell ~ cond, data = dat)
## 
## Residuals:
##     Min      1Q  Median      3Q     Max 
## -34.007 -15.007  -0.102  12.898  58.993 
## 
## Coefficients:
##             Estimate Std. Error t value Pr(>|t|)    
## (Intercept)  33.1024     0.9062  36.530   <2e-16 ***
## cond1-2       1.9048     1.2815   1.486    0.138    
## ---
## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
## 
## Residual standard error: 18.57 on 838 degrees of freedom
## Multiple R-squared:  0.002629,   Adjusted R-squared:  0.001439 
## F-statistic: 2.209 on 1 and 838 DF,  p-value: 0.1376

# let's do it with a mixed-model
dat$cond <- as.factor(dat$cond)
dat$ori <- as.factor(dat$ori)
contrasts(dat$cond) <- contrasts(dat$ori) <- c(-1,1)
# "center" block
dat$block <- dat$block - 3
mod<-lmer(dwell~cond*ori*block +(block|id), data=dat)
#let's check
summary(mod)

## Linear mixed model fit by REML t-tests use Satterthwaite approximations
##   to degrees of freedom [lmerMod]
## Formula: dwell ~ cond * ori * block + (block | id)
##    Data: dat
## 
## REML criterion at convergence: 6805.8
## 
## Scaled residuals: 
##     Min      1Q  Median      3Q     Max 
## -2.2715 -0.5414 -0.0264  0.5024  4.1672 
## 
## Random effects:
##  Groups   Name        Variance Std.Dev. Corr
##  id       (Intercept) 212.623  14.582       
##           block         6.897   2.626   0.55
##  Residual             114.856  10.717       
## Number of obs: 840, groups:  id, 168
## 
## Fixed effects:
##                   Estimate Std. Error        df t value Pr(>|t|)    
## (Intercept)       34.01276    1.18437 164.00000  28.718   <2e-16 ***
## cond1              0.91038    1.18437 164.00000   0.769   0.4432    
## ori1               1.31282    1.18437 164.00000   1.108   0.2693    
## block             -0.71776    0.33083 164.00000  -2.170   0.0315 *  
## cond1:ori1         2.21520    1.18437 164.00000   1.870   0.0632 .  
## cond1:block       -0.62847    0.33083 164.00000  -1.900   0.0592 .  
## ori1:block         0.08448    0.33083 164.00000   0.255   0.7988    
## cond1:ori1:block   0.65710    0.33083 164.00000   1.986   0.0487 *  
## ---
## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
## 
## Correlation of Fixed Effects:
##             (Intr) cond1  ori1   block  cnd1:1 cnd1:b or1:bl
## cond1        0.000                                          
## ori1        -0.012 -0.012                                   
## block        0.319  0.000 -0.004                            
## cond1:ori1  -0.012 -0.012  0.000 -0.004                     
## cond1:block  0.000  0.319 -0.004  0.000 -0.004              
## ori1:block  -0.004 -0.004  0.319 -0.012  0.000 -0.012       
## cnd1:r1:blc -0.004 -0.004  0.000 -0.012  0.319 -0.012  0.000

#This gets the location over time within the maps given the movements
getlocation<-function(movement){
  #total map
  map<-matrix(0,nrow=210, ncol=210)
  #column at start
  col<-106
  #row at start
  row<-106
  #loop through movement vector
  for (i in seq_along(movement)){
    #the current location on the map gets incremented
    map[row,col]<-map[row,col]+1
    #if movement is up, row number is incremented
    if (movement[i]=="up"){row<-row+1}
    #if movement is down, rown number is decremented
    if (movement[i]=="down"){row<-row-1}
    #if movement is right, column number is incremented
    if (movement[i]=="right"){col<-col+1}
    #if movement is left, column number is decremented
    if (movement[i]=="left"){col<-col-1}
  }
  return(map)
}

#this returns the vector of visited probabilities, i.e. the underlying p(potato)
getprobs<-function(movement, m){
  #total map
  map<-matrix(0,nrow=210, ncol=210)
  #column number
  col<-106
  #row number
  row<-106
  #initialize probability vector
  probs<-rep(0, length(movement))
  for (i in seq_along(movement)){
    map[row,col]<-map[row,col]+1
    #probability vector
    probs[i]<-m[row, col]
    if (movement[i]=="up"){row<-row+1}
    if (movement[i]=="down"){row<-row-1}
    if (movement[i]=="right"){col<-col+1}
    if (movement[i]=="left"){col<-col-1}
  }
  return(probs)
}

#initialize data frame
dat<-data.frame(prob=numeric(), trial=numeric(), condition=numeric(), block=numeric(), id=numeric())

#loop through the json files
for (i in 1:idnum){
  #get individual json
  myjson<-fromJSON(paste0(foldername, "ppt", i, ".json"))
  #initialize the vectors
  probs<-numeric()
  numb<-numeric()
  for (j in 1:5){
    #probabilities
    p<-getprobs(myjson$allMovementTrackers[[j]], outer(myjson$allColParameters[[j]], myjson$allRowParameters[[j]]))
    #number of trials
    numb<-c(numb, 1:100)
  }
  #dummy frame
  dummy<-data.frame(prob=p, trial=numb, condition=rep(myjson$condition, 5), block=rep(1:5, each=100), id=rep(i, 500))
  #bind them together
  dat<-rbind(dat, dummy)
}
#recode conditions
dat$cond<-mapvalues(dat$condition, 1:4, c("1-2", "1-2", "0.5-0.5", "0.5-0.5"))

library(tidyverse)

## Loading tidyverse: tibble
## Loading tidyverse: tidyr
## Loading tidyverse: readr
## Loading tidyverse: purrr
## Loading tidyverse: dplyr

## Conflicts with tidy packages ----------------------------------------------

## arrange():   dplyr, plyr
## combine():   dplyr, gridExtra
## compact():   purrr, plyr
## count():     dplyr, plyr
## expand():    tidyr, Matrix
## failwith():  dplyr, plyr
## filter():    dplyr, stats
## id():        dplyr, .GlobalEnv, plyr
## lag():       dplyr, stats
## mutate():    dplyr, plyr
## recode():    dplyr, car
## rename():    dplyr, plyr
## some():      purrr, car
## summarise(): dplyr, plyr
## summarize(): dplyr, plyr

dat$iblock <- cut(dat$trial,5)
tdat <- aggregate(prob~iblock + block + cond + id,mean,data=dat)
wdat <- tdat %>% unite(dblock,iblock,as.factor(block),-prob,-cond,-id) %>% spread(dblock,prob)

#create a frame for plotting with means and standard errors per block and condition
dplot<-ddply(dat, ~cond+trial, summarize, mu=mean(prob), se=se(prob))
#change condition to factor for plotting and type consitency
dplot$cond<-as.factor(dplot$cond)
#set limits
limits <- aes(ymax = mu + se, ymin=mu - se)

#plot the means over blocks and condition
p<-ggplot(dplot, aes(x=trial, y=mu, col=cond)) +
  #error bars
  geom_errorbar(aes(ymin=mu-se, ymax=mu+se), width=0.2, size=1, position=pd) +
  #lines
  geom_line(position=pd, size=1) +
  #classic theme, legend on bottom
  theme_classic()+
  theme(text = element_text(size=22,  family="serif"), legend.position="bottom")+
  ylab("Mean probability")+xlab("Trial")+
  guides(col=guide_legend(title="Condition (beta distribution)"))+
  #adjust text size
  theme(panel.background = element_blank(),
        panel.grid.major = element_blank(), 
        panel.grid.minor = element_blank(),
        axis.line = element_line(colour = "black"),
        panel.border = element_rect(colour = "black", fill=NA, size=2))
#show plot
print(p)

#logistic regression with probability vector
#notice that this will produce a warning but still an efficient estimate, we only need the transform
m<-glm(prob~trial, family=gaussian(link="logit"),data=dat)
#summarize
summary(m)

## 
## Call:
## glm(formula = prob ~ trial, family = gaussian(link = "logit"), 
##     data = dat)
## 
## Deviance Residuals: 
##      Min        1Q    Median        3Q       Max  
## -0.25304  -0.19700  -0.07878   0.13280   0.76388  
## 
## Coefficients:
##               Estimate Std. Error t value Pr(>|t|)    
## (Intercept) -1.2125459  0.0092675  -130.8   <2e-16 ***
## trial        0.0013008  0.0001567     8.3   <2e-16 ***
## ---
## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
## 
## (Dispersion parameter for gaussian family taken to be 0.05747735)
## 
##     Null deviance: 4831.9  on 83999  degrees of freedom
## Residual deviance: 4828.0  on 83998  degrees of freedom
## AIC: -1549
## 
## Number of Fisher Scoring iterations: 5

#this returns a vector of a crude estimate of how often a particular
#row-column combination has been explored before
getexplore<-function(movement, m){
  #create map
  map<-matrix(0,nrow=210, ncol=210)
  #col-number
  col<-106
  #row-number
  row<-106
  #initialize vectpr
  exploration<-rep(0, length(movement))
  #loop through
  for (i in seq_along(movement)){
    #keep track
    map[row,col]<-map[row,col]+1
    g<-getlocation(movement[1:i])
    #row exploration
    rs<-rowSums(g)
    #column exploration
    cs<-colSums(g)
    #crude combination of the two
    exploration[i]<-0.5*rs[row]/sum(rs)+0.5*cs[col]/sum(cs)
    #Updates as usual
    if (movement[i]=="up"){row<-row+1}
    if (movement[i]=="down"){row<-row-1}
    if (movement[i]=="right"){col<-col+1}
    if (movement[i]=="left"){col<-col-1}
  }
  return(exploration)
}

#this function returns the probability vector of a random mover and will serve as a baseline
randprobs<-function(movement, m){
  map<-matrix(0,nrow=210, ncol=210)
  col<-106
  row<-106
  probs<-rep(0, length(movement))
  for (i in seq_along(movement)){
    map[row,col]<-map[row,col]+1
    probs[i]<-m[row, col]
    #random move
    move<-sample(c("up", "down", "left", "right"), 1)
    if (move=="up"){row<-row+1}
    if (move=="down"){row<-row-1}
    if (move=="right"){col<-col+1}
    if (move=="left"){col<-col-1}
  }
  return(probs)
}

#this function returns the exploration of a random mover, again as a baseline
randexplore<-function(movement, m){
  map<-matrix(0,nrow=210, ncol=210)
  col<-106
  row<-106
  exploration<-rep(0, length(movement))
  for (i in seq_along(movement)){
    map[row,col]<-map[row,col]+1
    rs<-rowSums(map)
    cs<-colSums(map)
    exploration[i]<-0.5*rs[row]/sum(rs)+0.5*cs[col]/sum(cs)
    #random move
    move<-sample(c("up", "down", "left", "right"), 1)
    if (move=="up"){row<-row+1}
    if (move=="down"){row<-row-1}
    if (move=="right"){col<-col+1}
    if (move=="left"){col<-col-1}
  }
  return(exploration)
}

#initialize vectors
correlation<-randcor<-exploration<-randexp<-numb<-numeric()
#loop through
for (i in 1:idnum){
  myjson<-fromJSON(paste0(foldername, "ppt", i, ".json"))
  for (j in 1:5){
    #probability vector
    p<-getprobs(myjson$allMovementTrackers[[j]], outer(myjson$allColParameters[[j]], myjson$allRowParameters[[j]]))
    #random probability vector
    prand<-randprobs(myjson$allMovementTrackers[[j]], outer(myjson$allColParameters[[j]], myjson$allRowParameters[[j]]))
    #exploration vector
    e<-getexplore(myjson$allMovementTrackers[[j]], outer(myjson$allColParameters[[j]], myjson$allRowParameters[[j]]))
    #random exploration vector
    erand<-randexplore(myjson$allMovementTrackers[[j]], outer(myjson$allColParameters[[j]], myjson$allRowParameters[[j]]))
    #correlation functions
    correlation<-c(correlation, acf(rev(p), plot=FALSE)$acf[2:11])
    exploration<-c(exploration, acf(rev(e), plot=FALSE)$acf[2:11])
    randcor<-c(randcor, acf(prand, plot=FALSE)$acf[2:11])
    randexp<-c(randexp, acf(erand, plot=FALSE)$acf[2:11])
    #lag numbers
    numb<-c(numb, 1:10)
  }
}

#data frame
d<-data.frame(cor=correlation, rcor=randcor, exp=exploration, rexp=randexp, num=numb)
#plots of correlations
dplot<-ddply(d, ~num, summarize, cor=mean(cor), rcor=mean(randcor), rex=mean(exp), randex=mean(randexp))
#restack slightly
dplot<-data.frame(horizon=rep(1:10, 4), 
                  correlation=c(dplot$cor, dplot$rcor, dplot$rex, dplot$randex), 
                  Method=rep(rep(c("Empirical", "Random"), each=10), 2),
                  Value=rep(c("Expectation", "Certainty"), each=20))

#horizon smaller than 6 seems enough
dplot<-subset(dplot, horizon<6)

#do the plot
p <- ggplot(dplot, aes(x=horizon, y=correlation, col=Method)) + 
  #bars
  geom_line(stat="identity")+
  #0 to 1
  ylim(c(0,0.8)) + 
  #golden ratio error bars
  geom_point(size=1)+
  #facet the plot
  facet_wrap(~Value, scales = "free_y")+
  #theme and titles
  theme_classic() +xlab("Horizon")+ylab("ACF")+
  ggtitle("Planning horizon")+
  theme(text = element_text(size=20, family="serif"),
        strip.background = element_blank(),
        plot.title = element_text(size=20),
        legend.position = "bottom")

print(p)

#initialize frame
dat<-data.frame(id=numeric(), map=numeric(), info=numeric(), outcome=numeric(), trap=numeric())
#loop through
for (i in 1:idnum){
  myjson<-fromJSON(paste0(foldername, "ppt", i, ".json"))
  maps<-numeric()
  infos<-numeric()
  trap<-numeric()
  for (j in 1:8){
    #outer product to generate matrix
    m<-outer(myjson$allRowParameters[[5+j]] ,myjson$allColParameters[[5+j]])
    #fake central movement matrix
    mt<-t(matrix(c("no","up" ,"no", "left", "no", "right", "no", "down", "no"), nrow=3, ncol=3))
    #where is the bait
    mt<-mt[m[11:13,11:13]==0.8]
    #where from the center is it?
    bait<-mt[mt!="no"]
    #high or low info, roughly assessed but seems to work
    info<-ifelse(sum(myjson$allExploredRows[[5+j]])+sum(myjson$allExploredCols[[5+j]])>200, "high", "low")
    #these are the conditionals as set up by moritz
    if (bait=="right" & info=="high"){map<-"map1"}
    if (bait=="left" & info=="low"){map<-"map2"}
    if (bait=="left" & info=="high"){map<-"map3"}
    if (bait=="right" & info=="low"){map<-"map4"}
    if (bait=="down" & info=="high"){map<-"map5"}
    if (bait=="up" & info=="low"){map<-"map6"}
    if (bait=="up" & info=="high"){map<-"map7"}
    if (bait=="down" & info=="low"){map<-"map8"}
    #did they go for the trap
    trap<-c(trap, myjson$allMovementTrackers[[5+j]][1]==bait)
    #what map was it
    maps<-c(maps, map)
    #info
    infos<-c(infos,info)
  }
  #id
  id<-rep(i, 8)
  #total potato counts
  outcome<-as.numeric(unlist(myjson$allPotatoCounts[6:13]))
  #dummy frame
  dummy<-data.frame(id=id, map=maps, info=infos, outcome=outcome, trap=trap)
  #bind them
  dat<-rbind(dat, dummy)
}

#restricted as by setup
dat$res<-mapvalues(dat$map, paste0("map", 1:8), c("restricted", "restricted", "unrestricted","unrestricted","restricted","restricted","unrestricted","unrestricted" ))

m1<-lm(outcome~info+res, data=dat)
summary(m1)

## 
## Call:
## lm(formula = outcome ~ info + res, data = dat)
## 
## Residuals:
##     Min      1Q  Median      3Q     Max 
## -3.7932 -1.2187  0.2068  1.2068  4.7813 
## 
## Coefficients:
##                 Estimate Std. Error t value Pr(>|t|)    
## (Intercept)      3.79315    0.07612  49.831  < 2e-16 ***
## infolow         -0.19643    0.08790  -2.235   0.0256 *  
## resunrestricted -0.37798    0.08790  -4.300 1.83e-05 ***
## ---
## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
## 
## Residual standard error: 1.611 on 1341 degrees of freedom
## Multiple R-squared:  0.01721,    Adjusted R-squared:  0.01575 
## F-statistic: 11.74 on 2 and 1341 DF,  p-value: 8.791e-06

contrasts(dat$info) <- contrasts(dat$res) <- c(-1,1)
mod1<-lmer(outcome~info*res + (1|id), data=dat)
summary(mod1)

## Linear mixed model fit by REML t-tests use Satterthwaite approximations
##   to degrees of freedom [lmerMod]
## Formula: outcome ~ info * res + (1 | id)
##    Data: dat
## 
## REML criterion at convergence: 5069.1
## 
## Scaled residuals: 
##      Min       1Q   Median       3Q      Max 
## -2.48107 -0.69535  0.03513  0.70671  3.07839 
## 
## Random effects:
##  Groups   Name        Variance Std.Dev.
##  id       (Intercept) 0.2883   0.537   
##  Residual             2.3099   1.520   
## Number of obs: 1344, groups:  id, 168
## 
## Fixed effects:
##               Estimate Std. Error         df t value Pr(>|t|)    
## (Intercept)    3.50595    0.05861  167.00000  59.821  < 2e-16 ***
## info1         -0.09821    0.04146 1173.00000  -2.369    0.018 *  
## res1          -0.18899    0.04146 1173.00000  -4.559 5.69e-06 ***
## info1:res1    -0.01935    0.04146 1173.00000  -0.467    0.641    
## ---
## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
## 
## Correlation of Fixed Effects:
##            (Intr) info1 res1 
## info1      0.000             
## res1       0.000  0.000      
## info1:res1 0.000  0.000 0.000

m2<-glm(trap~info+res, data=dat, family="binomial")
summary(m2)

## 
## Call:
## glm(formula = trap ~ info + res, family = "binomial", data = dat)
## 
## Deviance Residuals: 
##     Min       1Q   Median       3Q      Max  
## -1.1914  -1.0394  -0.8844   1.3219   1.5020  
## 
## Coefficients:
##             Estimate Std. Error z value Pr(>|z|)    
## (Intercept) -0.35198    0.05593  -6.294  3.1e-10 ***
## info1        0.18322    0.05590   3.278  0.00105 ** 
## res1        -0.20164    0.05591  -3.607  0.00031 ***
## ---
## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
## 
## (Dispersion parameter for binomial family taken to be 1)
## 
##     Null deviance: 1823.6  on 1343  degrees of freedom
## Residual deviance: 1799.9  on 1341  degrees of freedom
## AIC: 1805.9
## 
## Number of Fisher Scoring iterations: 4

mod2<-glmer(trap~info*res + (1|id), data=dat, family=binomial())
summary(mod2)

## Generalized linear mixed model fit by maximum likelihood (Laplace
##   Approximation) [glmerMod]
##  Family: binomial  ( logit )
## Formula: trap ~ info * res + (1 | id)
##    Data: dat
## 
##      AIC      BIC   logLik deviance df.resid 
##   1733.9   1759.9   -861.9   1723.9     1339 
## 
## Scaled residuals: 
##     Min      1Q  Median      3Q     Max 
## -1.6201 -0.7009 -0.4726  0.8848  2.4219 
## 
## Random effects:
##  Groups Name        Variance Std.Dev.
##  id     (Intercept) 0.8784   0.9372  
## Number of obs: 1344, groups:  id, 168
## 
## Fixed effects:
##             Estimate Std. Error z value Pr(>|z|)    
## (Intercept) -0.42308    0.09536  -4.437 9.14e-06 ***
## info1        0.22153    0.06103   3.630 0.000284 ***
## res1        -0.24326    0.06109  -3.982 6.83e-05 ***
## info1:res1   0.09963    0.06083   1.638 0.101414    
## ---
## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
## 
## Correlation of Fixed Effects:
##            (Intr) info1  res1  
## info1      -0.033              
## res1        0.035 -0.039       
## info1:res1 -0.023  0.041 -0.039

#remove what we've stored so far (this is just to avoid further clashes and safe memory)
rm(list=ls())

foldername<-"/home/maarten/MEGA/MSc Projects/Moritz Krusche/Data/JSON/"

#this function again:
getlocation<-function(movement){
  map<-matrix(0,nrow=23, ncol=23)
  col<-12
  row<-12
  for (i in seq_along(movement)){
    map[row,col]<-map[row,col]+1
    if (movement[i]=="up"){row<-row+1}
    if (movement[i]=="down"){row<-row-1}
    if (movement[i]=="right"){col<-col+1}
    if (movement[i]=="left"){col<-col-1}
  }
  return(map)
}


x<-1:168
#format<-formatC(format="d",x,flag="0",width=ceiling(log10(max(x))))

#a list of all test maps
m<-rep(list(matrix(0, nrow=23, ncol=23)), 8)

#loop through participants
for (i in 1:168){
  #json
  #myjson<-fromJSON(paste0(foldername, i, ".json"))
  myjson <- fromJSON(paste0(foldername, "ppt", i, ".json"))
  #loop through test maps
  for (j in 1:8){
    #get target
    ma<-outer(myjson$allRowParameters[[5+j]] ,myjson$allColParameters[[5+j]])
    #check where the bait is
    mt<-t(matrix(c("no","up" ,"no", "left", "no", "right", "no", "down", "no"), nrow=3, ncol=3))
    mt<-mt[ma[11:13,11:13]==0.8]
    bait<-mt[mt!="no"]
    #check info
    info<-ifelse(sum(myjson$allExploredRows[[5+j]])+sum(myjson$allExploredCols[[5+j]])>200, "high", "low")
    #recode and add counts if map identified
    if (bait=="right" & info=="high"){m[[1]]<-m[[1]]+getlocation(myjson$allMovementTrackers[[5+j]])}
    if (bait=="left" & info=="low"){m[[2]]<-m[[2]]+getlocation(myjson$allMovementTrackers[[5+j]])}
    if (bait=="left" & info=="high"){m[[3]]<-m[[3]]+getlocation(myjson$allMovementTrackers[[5+j]])}
    if (bait=="right" & info=="low"){m[[4]]<-m[[4]]+getlocation(myjson$allMovementTrackers[[5+j]])}
    if (bait=="down" & info=="high"){m[[5]]<-m[[5]]+getlocation(myjson$allMovementTrackers[[5+j]])}
    if (bait=="up" & info=="low"){m[[6]]<-m[[6]]+getlocation(myjson$allMovementTrackers[[5+j]])}
    if (bait=="up" & info=="high"){m[[7]]<-m[[7]]+getlocation(myjson$allMovementTrackers[[5+j]])}
    if (bait=="down" & info=="low"){m[[8]]<-m[[8]]+getlocation(myjson$allMovementTrackers[[5+j]])}
  }
}

#let's create a plotting function to avoid having to do the same comment 8 times
#takes in the number of the testmap k and a title
myplot<-function(k, title){
  #get png image, this is linked to where I've stored them
  img <- readPNG(paste0("/home/hanshalbe/Documents/newimage", k, ".png"))
  #get a raster with interpolations for this image
  g <- rasterGrob(img, interpolate=TRUE, width=unit(1,"npc"), height=unit(1,"npc"))
  #get the correct counts as matrix
  map<-m[[k]][9:15, 9:15]
  #make a data frame of it for ggplot
  dp<-data.frame(x=rep(-3:3 ,each=7), y=rep(-3:3, 7), count=as.vector(map))
  #the max is always the starting point, we won't color it as this would be misleading
  dp$count<-ifelse(dp$count==max(dp$count), NA, dp$count)
  #everything with 0 counts won't be plotted
  dp$count<-ifelse(dp$count==0, NA, dp$count)
  #start to plot with fills determined by counts
  p  <- ggplot(dp, aes(x = x, y = y, fill = count))+
    #go all over the plot
    annotation_custom(g, xmin=-Inf, xmax=Inf, ymin=-Inf, ymax=Inf)+
    #lower alpha of heatmap such that png is still recognizable
    geom_tile(alpha=0.4)+ theme_bw()+
    #palett
    scale_fill_distiller(palette = "Spectral")+
    #expand over whole plot
    scale_x_continuous(expand = c(0, 0))+ 
    #same for y
    scale_y_discrete(expand = c(0, 0))+ guides(fill=FALSE)+
    #adjust them
    theme(strip.background = element_blank(),
          axis.title.x=element_blank(),
          axis.text.x=element_blank(),
          axis.ticks.x=element_blank(),
          axis.title.y=element_blank(),
          axis.text.y=element_blank(),
          axis.ticks.y=element_blank())+ggtitle(title)
  #return the plot
  return(p)
}

myplot(1, "Restricted space, high information")

myplot(2, "Restricted space, low information")

myplot(3, "Unrestricted space, high information")

myplot(4, "Unrestricted space, low information")

myplot(5, "Restricted space, high information")

myplot(6, "Restricted space, low information")

myplot(7, "Unrestricted space, high information")

myplot(8, "Unrestricted space, low information")